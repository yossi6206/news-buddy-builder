import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Upload, Loader2 } from 'lucide-react';
import NewsHeader from '@/components/NewsHeader';
import type { User } from '@supabase/supabase-js';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const { canManageContent, loading: roleLoading } = useUserRole(user);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    category: 'פוליטי',
    isFeatured: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    // Listen for auth changes FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // THEN get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setSessionLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Redirect unauthenticated users to login after both session and roles finish loading
    if (!sessionLoading && !roleLoading && !user) {
      navigate('/auth');
      return;
    }

    // Only redirect if: user exists and no permission (after loading)
    if (!sessionLoading && user && !roleLoading && !canManageContent) {
      toast({
        title: 'אין הרשאה',
        description: 'אין לך הרשאות לגשת לדף זה',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [canManageContent, roleLoading, navigate, toast, user, sessionLoading]);

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

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    try {
      setUploading(true);
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'שגיאה',
        description: 'שגיאה בהעלאת התמונה',
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: 'שגיאה',
        description: 'עליך להתחבר כדי להעלות כתבה',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.title || !formData.content) {
      toast({
        title: 'שגיאה',
        description: 'נא למלא את כל השדות החובה',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmitting(true);

      const imageUrl = await uploadImage();

      const { error } = await supabase.from('articles' as any).insert({
        title: formData.title,
        subtitle: formData.subtitle || null,
        content: formData.content,
        category: formData.category,
        image_url: imageUrl,
        author_id: user.id,
        is_featured: formData.isFeatured,
      });

      if (error) throw error;

      toast({
        title: 'הצלחה!',
        description: 'הכתבה פורסמה בהצלחה',
      });

      // Reset form
      setFormData({
        title: '',
        subtitle: '',
        content: '',
        category: 'פוליטי',
        isFeatured: false,
      });
      setImageFile(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        title: 'שגיאה',
        description: 'שגיאה בפרסום הכתבה',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (roleLoading || sessionLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !canManageContent) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">ניהול תוכן</h1>
            <p className="text-muted-foreground">העלאת כתבה חדשה</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            חזרה לעמוד הראשי
            <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>כתבה חדשה</CardTitle>
            <CardDescription>מלא את הפרטים להעלאת כתבה חדשה לאתר</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">כותרת *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="כותרת הכתבה"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">כותרת משנה</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="כותרת משנה (אופציונלי)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">תוכן הכתבה *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="תוכן מלא של הכתבה"
                  rows={8}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">קטגוריה</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="פוליטי">פוליטי</option>
                  <option value="ביטחוני">ביטחוני</option>
                  <option value="בעולם">בעולם</option>
                  <option value="כלכלה">כלכלה</option>
                  <option value="מדעי">מדעי</option>
                  <option value="ספורט">ספורט</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">תמונה</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="תצוגה מקדימה"
                      className="w-full max-w-md rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="h-4 w-4 rounded border-input"
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  הצג ככתבה ראשית בעמוד הבית
                </Label>
              </div>

              <Button type="submit" disabled={submitting || uploading} className="w-full">
                {submitting ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    מפרסם...
                  </>
                ) : (
                  <>
                    <Upload className="ml-2 h-4 w-4" />
                    פרסם כתבה
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
