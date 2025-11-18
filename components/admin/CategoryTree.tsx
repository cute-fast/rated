import React from 'react';

type Category = {
  id: string;
  name: string;
  slug: string;
  is_leaf: boolean;
  children?: Category[];
};

type Props = {
  categories: Category[];
  onAdd: (parentId?: string) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export default function CategoryTree({ categories, onAdd, onEdit, onDelete }: Props) {
  const renderTree = (nodes: Category[], parentId?: string) => (
    <ul className="ml-4 border-l border-gray-200">
      {nodes.map(cat => (
        <li key={cat.id} className="mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{cat.name}</span>
            <button className="text-xs text-blue-600" onClick={() => onAdd(cat.id)}>Add</button>
            <button className="text-xs text-yellow-600" onClick={() => onEdit(cat)}>Edit</button>
            <button className="text-xs text-red-600" onClick={() => onDelete(cat)}>Delete</button>
            {cat.is_leaf && <span className="ml-2 text-green-600 text-xs">Leaf</span>}
          </div>
          {cat.children && cat.children.length > 0 && renderTree(cat.children, cat.id)}
        </li>
      ))}
    </ul>
  );
  return <div>{renderTree(categories)}</div>;
} 