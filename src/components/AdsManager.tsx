import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, ArrowUp, ArrowDown, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
  position: string;
  is_active: boolean;
  order_index: number;
}

const AdsManager = () => {
  const { toast } = useToast();
  const [ads, setAds] = useState<Ad[]>([]);
  const [newAd, setNewAd] = useState({
    title: '',
    image_url: '',
    link_url: '',
    position: 'sidebar',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adToDelete, setAdToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchAds();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('ads_manager')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ads'
        },
        () => {
          fetchAds();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAds = async () => {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setAds(data);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `ads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: 'שגיאה',
        description: 'שגיאה בהעלאת התמונה',
        variant: 'destructive',
      });
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('article-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const addAd = async () => {
    if (!newAd.title.trim()) {
      toast({
        title: 'שגיאה',
        description: 'יש להזין כותרת',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    let imageUrl = newAd.image_url;
    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (!uploadedUrl) {
        setLoading(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    if (!imageUrl.trim()) {
      toast({
        title: 'שגיאה',
        description: 'יש להזין כתובת תמונה או להעלות תמונה',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const maxOrder = Math.max(...ads.map(ad => ad.order_index), -1);
    
    const { error } = await supabase
      .from('ads')
      .insert({
        title: newAd.title.trim(),
        image_url: imageUrl,
        link_url: newAd.link_url.trim() || null,
        position: newAd.position,
        is_active: true,
        order_index: maxOrder + 1,
      });

    if (error) {
      toast({
        title: 'שגיאה',
        description: 'שגיאה בהוספת פרסומת',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'הצלחה',
        description: 'פרסומת נוספה בהצלחה',
      });
      setNewAd({ title: '', image_url: '', link_url: '', position: 'sidebar' });
      setImageFile(null);
    }
    
    setLoading(false);
  };

  const handleDeleteClick = (id: string) => {
    setAdToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!adToDelete) return;

    const { error } = await supabase
      .from('ads')
      .delete()
      .eq('id', adToDelete);

    if (error) {
      toast({
        title: 'שגיאה',
        description: 'שגיאה במחיקת פרסומת',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'הצלחה',
        description: 'פרסומת נמחקה בהצלחה',
      });
    }

    setDeleteDialogOpen(false);
    setAdToDelete(null);
  };

  const toggleActive = async (id: string, currentState: boolean) => {
    const { error } = await supabase
      .from('ads')
      .update({ is_active: !currentState })
      .eq('id', id);

    if (error) {
      toast({
        title: 'שגיאה',
        description: 'שגיאה בעדכון סטטוס',
        variant: 'destructive',
      });
    }
  };

  const moveItem = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = ads.findIndex(ad => ad.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= ads.length) return;

    const currentItem = ads[currentIndex];
    const targetItem = ads[targetIndex];

    await supabase
      .from('ads')
      .update({ order_index: targetItem.order_index })
      .eq('id', currentItem.id);

    await supabase
      .from('ads')
      .update({ order_index: currentItem.order_index })
      .eq('id', targetItem.id);
  };

  const positionLabels: Record<string, string> = {
    sidebar: 'סרגל צד',
    top: 'עליון',
    bottom: 'תחתון',
    content: 'תוך התוכן',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ניהול פרסומות</CardTitle>
        <CardDescription>הוסף, ערוך ומחק פרסומות המופיעות באתר</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="ad-title">כותרת הפרסומת</Label>
            <Input
              id="ad-title"
              value={newAd.title}
              onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
              placeholder="שם הפרסומת..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ad-image">תמונה</Label>
            <div className="flex gap-2">
              <Input
                id="ad-image"
                value={newAd.image_url}
                onChange={(e) => setNewAd({ ...newAd, image_url: e.target.value })}
                placeholder="כתובת URL של תמונה..."
                className="flex-1"
              />
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Button type="button" variant="outline">
                  <Upload className="ml-2 h-4 w-4" />
                  העלה
                </Button>
              </div>
            </div>
            {imageFile && (
              <p className="text-sm text-muted-foreground">קובץ נבחר: {imageFile.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ad-link">קישור (אופציונלי)</Label>
            <Input
              id="ad-link"
              value={newAd.link_url}
              onChange={(e) => setNewAd({ ...newAd, link_url: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ad-position">מיקום</Label>
            <Select
              value={newAd.position}
              onValueChange={(value) => setNewAd({ ...newAd, position: value })}
            >
              <SelectTrigger id="ad-position">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sidebar">סרגל צד</SelectItem>
                <SelectItem value="top">עליון</SelectItem>
                <SelectItem value="bottom">תחתון</SelectItem>
                <SelectItem value="content">תוך התוכן</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={addAd} disabled={loading} className="w-full">
            <Plus className="ml-2 h-4 w-4" />
            הוסף פרסומת
          </Button>
        </div>

        <div className="space-y-2 mt-6">
          <h3 className="font-semibold text-lg">פרסומות קיימות</h3>
          {ads.map((ad, index) => (
            <div
              key={ad.id}
              className={`flex items-center gap-2 p-3 rounded-lg border ${
                ad.is_active ? 'bg-background' : 'bg-muted opacity-60'
              }`}
            >
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveItem(ad.id, 'up')}
                  disabled={index === 0}
                  className="h-6 w-6 p-0"
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveItem(ad.id, 'down')}
                  disabled={index === ads.length - 1}
                  className="h-6 w-6 p-0"
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>
              
              <img src={ad.image_url} alt={ad.title} className="w-16 h-16 object-cover rounded" />
              
              <div className="flex-1">
                <p className="font-medium text-sm">{ad.title}</p>
                <p className="text-xs text-muted-foreground">
                  {positionLabels[ad.position] || ad.position}
                  {ad.link_url && ' • קישור: ' + ad.link_url.substring(0, 30) + '...'}
                </p>
              </div>
              
              <Button
                variant={ad.is_active ? 'outline' : 'default'}
                size="sm"
                onClick={() => toggleActive(ad.id, ad.is_active)}
              >
                {ad.is_active ? 'השבת' : 'הפעל'}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteClick(ad.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {ads.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              אין פרסומות כרגע
            </p>
          )}
        </div>
      </CardContent>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>האם אתה בטוח?</AlertDialogTitle>
            <AlertDialogDescription>
              פעולה זו תמחק את הפרסומת לצמיתות. לא ניתן לבטל את הפעולה.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ביטול</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              מחק
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default AdsManager;
