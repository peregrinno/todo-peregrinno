"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useCategoryContext, CustomCategory } from "@/context/category-context";
import { X, Plus, Settings, Pencil } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function SettingsPage() {
  const { customCategories, addCategory, updateCategory, deleteCategory } = useCategoryContext();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#4b5563"); 
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CustomCategory | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryColor, setEditCategoryColor] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const categoryValue = newCategoryName.trim().toLowerCase().replace(/\s+/g, '_');
      
      addCategory({
        name: newCategoryName.trim(),
        value: categoryValue,
        color: selectedColor
      });
      
      setNewCategoryName("");
      setSelectedColor("#4b5563");
    }
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id);
  };

  const handleEditCategory = (category: CustomCategory) => {
    setEditingCategory(category);
    setEditCategoryName(category.name);
    setEditCategoryColor(category.color);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingCategory && editCategoryName.trim()) {
      updateCategory(editingCategory.id, {
        name: editCategoryName.trim(),
        value: editingCategory.value, // Mantém o mesmo value para não quebrar referências
        color: editCategoryColor
      });
      
      setEditDialogOpen(false);
      setEditingCategory(null);
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Configurações</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Categorias Personalizadas</CardTitle>
          <CardDescription>
            Adicione, edite ou remova categorias personalizadas para suas tarefas.
            Estas categorias serão adicionadas às categorias padrão existentes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-5">
                <Label htmlFor="categoryName">Nome da categoria</Label>
                <Input
                  id="categoryName"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Digite o nome da categoria"
                />
              </div>
              <div className="md:col-span-5">
                <Label>Cor</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full flex justify-between items-center"
                    >
                      <span>Selecione uma cor</span>
                      <div 
                        className="h-4 w-4 rounded-full" 
                        style={{ backgroundColor: selectedColor }}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3">
                    <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="md:col-span-2">
                <Button 
                  onClick={handleAddCategory} 
                  disabled={!newCategoryName.trim()}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-1" /> Adicionar
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-medium mb-2">Categorias Personalizadas</h3>
              
              {customCategories.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">
                  Você ainda não criou nenhuma categoria personalizada.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {customCategories.map((category) => (
                    <div 
                      key={category.id}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <div className="flex items-center gap-2">
                        <Badge 
                          style={{ 
                            backgroundColor: category.color, 
                            color: getContrastColor(category.color) 
                          }}
                        >
                          {category.name}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            As categorias personalizadas ficarão disponíveis ao criar ou editar tarefas.
          </p>
        </CardFooter>
      </Card>

      {/* Modal de Edição */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="editCategoryName">Nome</Label>
              <Input
                id="editCategoryName"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                placeholder="Nome da categoria"
              />
            </div>
            <div>
              <Label>Cor</Label>
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="w-full flex justify-between items-center"
                >
                  <span>Cor selecionada</span>
                  <div 
                    className="h-4 w-4 rounded-full" 
                    style={{ backgroundColor: editCategoryColor }}
                  />
                </Button>
                <HexColorPicker color={editCategoryColor} onChange={setEditCategoryColor} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} disabled={!editCategoryName.trim()}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Função para calcular a cor de texto adequada (preto ou branco) com base na cor de fundo
function getContrastColor(hexColor: string): string {
  // Remover o # se existir
  const hex = hexColor.replace('#', '');
  
  // Converter para RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calcular luminância
  // Fórmula padrão para calcular brilho percebido
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Retornar preto para cores claras, branco para cores escuras
  return luminance > 0.5 ? '#000000' : '#ffffff';
}