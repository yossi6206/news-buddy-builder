import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Upload, Plus, Edit2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface ReporterUpdate {
  id: string;
  author_name: string;
  title: string;
  time: string;
  is_live: boolean;
  avatar_url: string | null;
  order_index: number;
  is_active: boolean;
}

const ReporterUpdatesManager = () => {
  const { toast } = useToast();
  const [updates, setUpdates] = useState<ReporterUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    author_name: '',
    title: '',
    time: '',
    is_live: false,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const { data, error } = await supabase
        .from('reporter_updates')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setUpdates((data as any) || []);
    } catch (error: any) {
      toast({
        title: 'שגיאה',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('article-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let avatarUrl = editingId ? updates.find(u => u.id === editingId)?.avatar_url : null;

      if (imageFile) {
        avatarUrl = await uploadImage(imageFile);
      }

      const updateData = {
        ...formData,
        avatar_url: avatarUrl,
        order_index: editingId 
          ? updates.find(u => u.id === editingId)?.order_index 
          : updates.length,
      };

      if (editingId) {
        const { error } = await supabase
          .from('reporter_updates')
          .update(updateData as any)
          .eq('id', editingId);

        if (error) throw error;

        toast({
          title: 'עודכן בהצלחה',
          description: 'העדכון נשמר בהצלחה',
        });
      } else {
        const { error } = await supabase
          .from('reporter_updates')
          .insert([updateData as any]);

        if (error) throw error;

        toast({
          title: 'נוסף בהצלחה',
          description: 'העדכון נוסף בהצלחה',
        });
      }

      resetForm();
      fetchUpdates();
    } catch (error: any) {
      toast({
        title: 'שגיאה',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (update: ReporterUpdate) => {
    setEditingId(update.id);
    setFormData({
      author_name: update.author_name,
      title: update.title,
      time: update.time,
      is_live: update.is_live,
    });
    if (update.avatar_url) {
      setImagePreview(update.avatar_url);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('האם למחוק את העדכון?')) return;

    try {
      const { error } = await supabase.rpc('delete_reporter_update', { _id: id });

      if (error) throw error;

      toast({
        title: 'נמחק בהצלחה',
        description: 'העדכון נמחק',
      });
      
      fetchUpdates();
    } catch (error: any) {
      toast({
        title: 'שגיאה',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('reporter_updates')
        .update({ is_active: !currentStatus } as any)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'עודכן בהצלחה',
        description: currentStatus ? 'העדכון הוסתר' : 'העדכון הופעל',
      });
      
      fetchUpdates();
    } catch (error: any) {
      toast({
        title: 'שגיאה',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      author_name: '',
      title: '',
      time: '',
      is_live: false,
    });
    setImageFile(null);
    setImagePreview('');
  };

  if (loading) {
    return <div>טוען...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ניהול איש הכתבים</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author_name">שם הכתב</Label>
              <Input
                id="author_name"
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                placeholder="אלי לוי"
                required
              />
            </div>

            <div>
              <Label htmlFor="time">שעה</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="15:23"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="title">כותרת</Label>
            <Textarea
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="ראש הממשלה בהודעה חריגה..."
              required
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="is_live"
              checked={formData.is_live}
              onCheckedChange={(checked) => setFormData({ ...formData, is_live: checked })}
            />
            <Label htmlFor="is_live">דוח חיוני (LIVE)</Label>
          </div>

          <div>
            <Label htmlFor="avatar">תמונת כתב (אופציונלי)</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="תצוגה מקדימה"
                className="mt-2 w-16 h-16 rounded-full object-cover"
              />
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              {editingId ? (
                <>
                  <Edit2 className="ml-2 h-4 w-4" />
                  עדכן
                </>
              ) : (
                <>
                  <Plus className="ml-2 h-4 w-4" />
                  הוסף עדכון
                </>
              )}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                ביטול
              </Button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          <h3 className="font-semibold">עדכונים קיימים</h3>
          {updates.length === 0 ? (
            <p className="text-muted-foreground">אין עדכונים</p>
          ) : (
            updates.map((update) => (
              <div
                key={update.id}
                className="flex items-start gap-4 p-4 border rounded-lg"
              >
                {update.avatar_url ? (
                  <img
                    src={update.avatar_url}
                    alt={update.author_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-muted" />
                )}
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-primary">{update.author_name}</span>
                    {update.is_live && (
                      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">
                        דוח חיוני
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">{update.time}</span>
                  </div>
                  <p className="text-sm">{update.title}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={update.is_active}
                    onCheckedChange={() => toggleActive(update.id, update.is_active)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(update)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(update.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReporterUpdatesManager;
