import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { FixedSizeList as List } from 'react-window';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { DragDropContext as DndContext, Droppable as DndDroppable, Draggable as DndDraggable, DropResult as DndDropResult } from '@hello-pangea/dnd';
import Select from 'react-select';
import Modal from 'react-modal';
import ProductModal from '../../components/admin/ProductModal';

// Tree node type
interface TreeNode {
  id: string;
  name: string;
  parentId: string | null;
  hasChildren: boolean;
  level: number;
  isExpanded?: boolean;
  isLoading?: boolean;
  children?: TreeNode[];
  slug: string;
  parent_slug?: string | null;
  is_leaf?: boolean; // Added for filtering
}

// Utility: build tree from flat list
function buildTree(flat: any[]): TreeNode[] {
  const map: Record<string, TreeNode> = {};
  const roots: TreeNode[] = [];
  flat.forEach(cat => {
    map[cat.slug] = {
      id: cat.slug,
      name: cat.name,
      parentId: cat.parent_slug || null,
      hasChildren: false, // will update below
      level: 1, // will update below
      slug: cat.slug,
      parent_slug: cat.parent_slug || null,
      children: [],
      is_leaf: cat.is_leaf, // Assuming is_leaf is part of the category data
    };
  });
  // Assign children and levels
  flat.forEach(cat => {
    if (cat.parent_slug && map[cat.parent_slug]) {
      map[cat.parent_slug].children = map[cat.parent_slug].children || [];
      map[cat.parent_slug].children!.push(map[cat.slug]);
      map[cat.parent_slug].hasChildren = true;
      map[cat.slug].level = (map[cat.parent_slug].level || 1) + 1;
    } else {
      roots.push(map[cat.slug]);
    }
  });
  return roots;
}

// Utility: flatten tree for react-window
function flattenTree(nodes: TreeNode[], expandedMap: Record<string, boolean>): TreeNode[] {
  const result: TreeNode[] = [];
  function walk(node: TreeNode) {
    result.push(node);
    if (node.hasChildren && expandedMap[node.id] && node.children) {
      node.children.forEach(walk);
    }
  }
  nodes.forEach(walk);
  return result;
}

// Utility: find a node by id in the tree
function findNodeById(nodes: TreeNode[], id: string): TreeNode | null {
  for (const n of nodes) {
    if (n.id === id) return n;
    if (n.children) {
      const found = findNodeById(n.children, id);
      if (found) return found;
    }
  }
  return null;
}

// Utility: build path for a category
function buildCategoryPath(id: string, map: Record<string, TreeNode>): string {
  let path = [];
  let currentId = id;
  let found = null;
  while (currentId) {
    found = map[currentId];
    if (found) {
      path.unshift(found.name);
      currentId = found.parentId;
    } else {
      break;
    }
  }
  return path.join(' > ');
}

// Utility: get all descendants of a node
function getDescendantIds(node: TreeNode): string[] {
  let ids: string[] = [];
  if (node.children) {
    for (const child of node.children) {
      ids.push(child.id);
      ids = ids.concat(getDescendantIds(child));
    }
  }
  return ids;
}

export default function AdminCategoriesManager() {
  const [rootCategories, setRootCategories] = useState<TreeNode[]>([]);
  const [childrenMap, setChildrenMap] = useState<Record<string, TreeNode[]>>({}); // parentId -> children
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<any>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [editName, setEditName] = useState('');
  const [editParent, setEditParent] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const listRef = useRef<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newParent, setNewParent] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [allNonLeafCategories, setAllNonLeafCategories] = useState<any[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productEditName, setProductEditName] = useState('');
  const [productEditLoading, setProductEditLoading] = useState(false);
  const [productOrder, setProductOrder] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'product' | 'faq'>('general');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newMetaTitle, setNewMetaTitle] = useState('');
  const [newMetaDescription, setNewMetaDescription] = useState('');
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newSponsorAsin, setNewSponsorAsin] = useState('');
  const [newIsLeaf, setNewIsLeaf] = useState(false);
  const [newFaq, setNewFaq] = useState('');
  const [addTab, setAddTab] = useState<'general' | 'seo' | 'product' | 'faq'>('general');
  const [newProductAsins, setNewProductAsins] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [productSearchResults, setProductSearchResults] = useState<any[]>([]);
  const [productSearchLoading, setProductSearchLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [sponsorSearch, setSponsorSearch] = useState('');
  const [sponsorSearchResults, setSponsorSearchResults] = useState<any[]>([]);
  const [sponsorSearchLoading, setSponsorSearchLoading] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<any>(null);

  // 1. Add state for all editable fields at the top of the component
  const [editMetaTitle, setEditMetaTitle] = useState('');
  const [editMetaDescription, setEditMetaDescription] = useState('');
  const [editCategoryTitle, setEditCategoryTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editSponsorAsin, setEditSponsorAsin] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editFaq, setEditFaq] = useState('');

  // 1. Replace editFaq (string) with editFaqList (array of strings)
  const [editFaqList, setEditFaqList] = useState<string[]>([]);

  // 1. Add state for sponsor search and main products in the right panel
  const [editSponsorSearch, setEditSponsorSearch] = useState('');
  const [editSponsorSearchResults, setEditSponsorSearchResults] = useState<any[]>([]);
  const [editSponsorSearchLoading, setEditSponsorSearchLoading] = useState(false);
  const [editSelectedSponsor, setEditSelectedSponsor] = useState<any>(null);
  const [editMainProductSearch, setEditMainProductSearch] = useState('');
  const [editMainProductSearchResults, setEditMainProductSearchResults] = useState<any[]>([]);
  const [editMainProductSearchLoading, setEditMainProductSearchLoading] = useState(false);
  const [editSelectedMainProducts, setEditSelectedMainProducts] = useState<any[]>([]);

  // 1. Add state for product creation modal and form fields
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [createProductContext, setCreateProductContext] = useState<'sponsor' | 'main' | null>(null);
  const [newProductAsin, setNewProductAsin] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductSlug, setNewProductSlug] = useState('');
  const [newProductBrand, setNewProductBrand] = useState('');
  const [newProductImage, setNewProductImage] = useState('');
  const [createProductLoading, setCreateProductLoading] = useState(false);
  const [createProductError, setCreateProductError] = useState('');

  // 1. Add state for editing a product
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [editProductInitialValues, setEditProductInitialValues] = useState<any>(null);
  const [editProductContext, setEditProductContext] = useState<'sponsor' | 'main' | null>(null);
  const [editProductIndex, setEditProductIndex] = useState<number | null>(null);

  // Fetch top-level categories on mount
  useEffect(() => {
    setLoading(true);
    axios.get('https://api.rated.xyz/api/admin/categories/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setRootCategories(res.data.map((cat: any) => ({
          ...cat,
          id: cat.slug,
          parentId: cat.parent_slug || null,
          hasChildren: true, // assume true for lazy
          level: 1,
          is_leaf: cat.is_leaf, // Assuming is_leaf is part of the category data
        })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch children for a node
  const fetchChildren = async (parentId: string, level: number) => {
    setLoadingMap(prev => ({ ...prev, [parentId]: true }));
    const res = await axios.get('https://api.rated.xyz/api/admin/categories/', {
      params: { parent_slug: parentId },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    console.log(res.data);
    setChildrenMap(prev => ({
      ...prev,
      [parentId]: res.data.map((cat: any) => ({
        ...cat,
        id: cat.slug,
        parentId: cat.parent_slug || null,
        hasChildren: true, // assume true for lazy
        level: level + 1,
        is_leaf: cat.is_leaf, // Assuming is_leaf is part of the category data
      })),
    }));
    setLoadingMap(prev => ({ ...prev, [parentId]: false }));
  };

  // Sort rootCategories and childrenMap alphabetically by name before flattening
  const sortedRootCategories = [...rootCategories].sort((a, b) => a.name.localeCompare(b.name));
  const sortedChildrenMap: typeof childrenMap = {};
  Object.keys(childrenMap).forEach(parentId => {
    sortedChildrenMap[parentId] = [...childrenMap[parentId]].sort((a, b) => a.name.localeCompare(b.name));
  });

  // Flatten tree for react-window
  function flattenTreeLazy(nodes: TreeNode[], expandedMap: Record<string, boolean>): TreeNode[] {
    const result: TreeNode[] = [];
    function walk(node: TreeNode) {
      result.push(node);
      if (node.hasChildren && expandedMap[node.id] && sortedChildrenMap[node.id]) {
        sortedChildrenMap[node.id].forEach(walk);
      }
    }
    nodes.forEach(walk);
    return result;
  }
  const flatNodes = flattenTreeLazy(sortedRootCategories, expanded);

  // Handle expand/collapse
  const handleToggle = async (node: TreeNode) => {
    setExpanded(prev => ({ ...prev, [node.id]: !prev[node.id] }));
    if (!expanded[node.id] && !childrenMap[node.id]) {
      await fetchChildren(node.id, node.level);
    }
    setSelectedId(node.id);
  };

  // Fetch all non-leaf categories for parent dropdown
  useEffect(() => {
    axios.get('https://api.rated.xyz/api/admin/categories/non-leaf', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setAllNonLeafCategories(res.data))
      .catch(() => setAllNonLeafCategories([]));
  }, []);

  // Utility: get all descendants of a node (lazy)
  function getDescendantIdsLazy(node: TreeNode): string[] {
    let ids: string[] = [];
    const children = childrenMap[node.id] || [];
    for (const child of children) {
      ids.push(child.id);
      ids = ids.concat(getDescendantIdsLazy(child));
    }
    return ids;
  }

  // Utility: build path for a category (lazy)
  function buildCategoryPathLazy(id: string): string {
    let path = [];
    let currentId = id;
    let found: any = null;
    // Search root and all loaded children
    const allNodes: Record<string, TreeNode> = {};
    rootCategories.forEach(n => { allNodes[n.id] = n; });
    Object.values(childrenMap).flat().forEach(n => { allNodes[n.id] = n; });
    while (currentId) {
      found = allNodes[currentId];
      if (found) {
        path.unshift(found.name);
        currentId = found.parentId;
      } else {
        break;
      }
    }
    return path.join(' > ');
  }

  // Top search bar: search all categories except leafs with no parent
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    axios.get('https://api.rated.xyz/api/admin/categories/search', {
      params: { q: searchQuery },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        // Build a map for path building
        const resultMap = Object.fromEntries(res.data.map((cat: any) => [cat.slug, cat]));
        // Add parent slugs for path building
        res.data.forEach((cat: any) => {
          let currentId = cat.parent_slug;
          while (currentId && !resultMap[currentId]) {
            // Try to find parent in allNonLeafCategories
            const parent = allNonLeafCategories.find(c => c.slug === currentId);
            if (parent) {
              resultMap[parent.slug] = parent;
              currentId = parent.parent_slug;
            } else {
              break;
            }
          }
        });
        setSearchResults(res.data.map((cat: any) => ({
          ...cat,
          path: buildCategoryPathFromMap(cat.slug, resultMap)
        })));
        setSearching(false);
      })
      .catch(() => {
        setSearchResults([]);
        setSearching(false);
      });
  }, [searchQuery, allNonLeafCategories]);

  // Expand and scroll to node in tree (ensure all ancestors are loaded before expanding next)
  const handleSearchSelect = async (cat: any) => {
    // Build ancestor chain from root to parent
    let ancestors: string[] = [];
    let currentId = cat.parent_slug;
    const allNodes: Record<string, TreeNode> = {};
    rootCategories.forEach(n => { allNodes[n.id] = n; });
    Object.values(childrenMap).flat().forEach(n => { allNodes[n.id] = n; });
    while (currentId) {
      ancestors.unshift(currentId);
      const found = allNodes[currentId];
      if (found) {
        currentId = found.parentId;
      } else {
        break;
      }
    }
    // Sequentially expand and load each ancestor
    let parentId = null;
    for (const id of ancestors) {
      setExpanded(prev => ({ ...prev, [id]: true }));
      if (!childrenMap[id]) {
        // Wait for children to load before expanding next
        await fetchChildren(id, parentId ? (allNodes[parentId]?.level || 1) : 1);
      }
      parentId = id;
    }
    setSelectedId(cat.slug);
    // Wait a tick for state to update, then scroll
    setTimeout(() => {
      const idx = flatNodes.findIndex(n => n.id === cat.slug);
      if (idx !== -1 && listRef.current) {
        listRef.current.scrollToItem(idx, 'center');
      }
    }, 100);
    setSearchResults([]);
    setSearchQuery('');
  };

  // Drag-and-drop handler (lazy, only within loaded nodes)
  const onDragEnd = async (result: DndDropResult) => {
    if (!result.destination) return;
    const sourceIdx = result.source.index;
    const destIdx = result.destination.index;
    const draggedNode = flatNodes[sourceIdx];
    const destNode = flatNodes[destIdx];
    if (draggedNode.id === destNode.id) return;
    const descendants = getDescendantIdsLazy(draggedNode);
    if (descendants.includes(destNode.id)) return;
    setActionLoading(true);
    await axios.patch(`https://api.rated.xyz/api/admin/categories/${draggedNode.id}`, {
      parent_slug: destNode.id,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    // Refetch root and clear childrenMap for fresh state
    setLoading(true);
    axios.get('https://api.rated.xyz/api/admin/categories/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setRootCategories(res.data.map((cat: any) => ({
          ...cat,
          id: cat.slug,
          parentId: cat.parent_slug || null,
          hasChildren: true,
          level: 1,
          is_leaf: cat.is_leaf, // Assuming is_leaf is part of the category data
        })));
        setChildrenMap({});
        setLoading(false);
      })
      .catch(() => setLoading(false));
    setActionLoading(false);
  };

  // Utility: build path for a category using a map of all non-leaf categories
  function buildCategoryPathFromMap(id: string, map: Record<string, any>): string {
    let path = [];
    let currentId = id;
    let found = null;
    while (currentId) {
      found = map[currentId];
      if (found) {
        path.unshift(found.name);
        currentId = found.parent_slug;
      } else {
        break;
      }
    }
    return path.join(' > ');
  }

  // Parent options: all non-leaf categories except self/descendants, with full path
  const nonLeafMap = Object.fromEntries(allNonLeafCategories.map(cat => [cat.slug, cat]));
  const parentOptions = allNonLeafCategories
    .filter(cat => {
      if (!selectedId) return true;
      if (cat.slug === selectedId) return false;
      // Exclude descendants
      const selectedNode = rootCategories.find(n => n.id === selectedId) || Object.values(childrenMap).flat().find(n => n.id === selectedId);
      if (!selectedNode) return true;
      const descendants = getDescendantIdsLazy(selectedNode);
      return !descendants.includes(cat.slug);
    })
    .map(cat => ({ value: cat.slug, label: buildCategoryPathFromMap(cat.slug, nonLeafMap) }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // For add modal parent options, allow the selected category as a parent
  const addParentOptions = allNonLeafCategories
    .map(cat => ({ value: cat.slug, label: buildCategoryPathFromMap(cat.slug, nonLeafMap) }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // For edit panel parent options, exclude self and descendants
  const editParentOptions = allNonLeafCategories
    .filter(cat => {
      if (!selectedId) return true;
      if (cat.slug === selectedId) return false;
      // Exclude descendants
      const selectedNode = rootCategories.find(n => n.id === selectedId) || Object.values(childrenMap).flat().find(n => n.id === selectedId);
      if (!selectedNode) return true;
      const descendants = getDescendantIdsLazy(selectedNode);
      return !descendants.includes(cat.slug);
    })
    .map(cat => ({ value: cat.slug, label: buildCategoryPathFromMap(cat.slug, nonLeafMap) }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // 2. When selectedDetails changes, initialize editFaqList
  useEffect(() => {
    if (selectedDetails) {
      setEditName(selectedDetails.name || '');
      setEditParent(selectedDetails.parent_slug || '');
      setEditMetaTitle(selectedDetails.meta_title || '');
      setEditMetaDescription(selectedDetails.meta_description || '');
      setEditCategoryTitle(selectedDetails.category_title || '');
      setEditSubtitle(selectedDetails.subtitle || '');
      setEditSponsorAsin(selectedDetails.sponsor_asin || '');
      setEditImageUrl(selectedDetails.image_url || '');
      setEditFaqList(Array.isArray(selectedDetails.faq) ? selectedDetails.faq : (selectedDetails.faq ? [selectedDetails.faq] : []));
    }
  }, [selectedDetails]);

  // 2. When selectedDetails changes, initialize sponsor and main products
  useEffect(() => {
    if (selectedDetails && selectedDetails.is_leaf) {
      setEditSponsorSearch('');
      setEditSponsorSearchResults([]);
      setEditSponsorSearchLoading(false);
      setEditSelectedSponsor(selectedDetails.sponsor_product || null);
      setEditMainProductSearch('');
      setEditMainProductSearchResults([]);
      setEditMainProductSearchLoading(false);
      // If main_products is available, use it; else use product_asins
      if (Array.isArray(selectedDetails.main_products) && selectedDetails.main_products.length > 0) {
        setEditSelectedMainProducts(selectedDetails.main_products);
      } else if (Array.isArray(selectedDetails.product_asins) && selectedDetails.product_asins.length > 0) {
        setEditSelectedMainProducts(selectedDetails.product_asins.map((asin: any) => typeof asin === 'object' ? asin : { asin }));
      } else {
        setEditSelectedMainProducts([]);
      }
    }
  }, [selectedDetails]);

  // 3. In the right panel JSX, render editable inputs for all fields (example for each tab)
  // --- In 'general' tab ---
  // --- In 'seo' tab ---
  // --- In 'product' tab ---
  // --- In 'faq' tab ---

  // 3. In the Product tab, render sponsor and main products editing UI (for leaf categories)
  {activeTab === 'product' && selectedDetails.is_leaf && (
    <>
      {/* Sponsor Product Search */}
      <div className="mb-3">
        <label className="block mb-1">Sponsor ASIN</label>
        <input
          type="text"
          value={editSponsorSearch}
          onChange={async e => {
            const value = e.target.value;
            setEditSponsorSearch(value);
            if (!value.trim()) {
              setEditSponsorSearchResults([]);
              setEditSponsorSearchLoading(false);
              return;
            }
            setEditSponsorSearchLoading(true);
            const res = await axios.get('https://api.rated.xyz/api/search/products', { params: { q: value } });
            setEditSponsorSearchResults(res.data);
            setEditSponsorSearchLoading(false);
          }}
          className="w-full border rounded px-2 py-1 mb-1"
          placeholder="Search sponsor by name or ASIN"
        />
        {editSponsorSearchLoading && <div className="text-xs text-gray-500">Searching...</div>}
        {editSponsorSearchResults.length > 0 && (
          <div className="bg-white border rounded shadow max-h-40 overflow-y-auto z-50 relative">
            {editSponsorSearchResults.map(prod => (
              <div
                key={prod.asin}
                className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                onClick={() => {
                  setEditSelectedSponsor(prod);
                  setEditSponsorSearch(prod.name + ' (' + prod.asin + ')');
                  setEditSponsorSearchResults([]);
                }}
              >
                <span className="font-medium">{prod.name}</span>
                <span className="text-gray-400 ml-2">{prod.asin}</span>
              </div>
            ))}
          </div>
        )}
        {/* --- Sponsor Product Edit/Remove Buttons --- */}
        {(editSelectedSponsor || selectedDetails.sponsor_asin) && (
          <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded mt-2">
            <span className="font-mono">
              {editSelectedSponsor
                ? `${editSelectedSponsor.name} (${editSelectedSponsor.asin})`
                : selectedDetails.sponsor_asin}
            </span>
            <button
              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
              onClick={async () => {
                const asin = editSelectedSponsor?.asin || selectedDetails.sponsor_asin;
                if (!asin) return;
                const token = localStorage.getItem('token');
                const res = await axios.get(`https://api.rated.xyz/api/admin/products/${asin}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                setEditProductModalOpen(true);
                setEditProductInitialValues(res.data);
                setEditProductContext('sponsor');
                setEditProductIndex(null);
              }}
            >Edit</button>
            <button
              className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
              onClick={() => {
                setEditSelectedSponsor(null);
                setEditSponsorSearch('');
                setSelectedDetails({ ...selectedDetails, sponsor_asin: null });
              }}
            >Remove</button>
          </div>
        )}
      </div>
      {/* Main Products Search and List */}
      <div className="mb-3">
        <label className="block mb-1">Add Main Products</label>
        <input
          type="text"
          value={editMainProductSearch}
          onChange={async e => {
            const value = e.target.value;
            setEditMainProductSearch(value);
            if (!value.trim()) {
              setEditMainProductSearchResults([]);
              setEditMainProductSearchLoading(false);
              return;
            }
            setEditMainProductSearchLoading(true);
            const res = await axios.get('https://api.rated.xyz/api/search/products', { params: { q: value } });
            setEditMainProductSearchResults(res.data);
            setEditMainProductSearchLoading(false);
          }}
          className="w-full border rounded px-2 py-1 mb-1"
          placeholder="Search products by name or ASIN"
        />
        {editMainProductSearchLoading && <div className="text-xs text-gray-500">Searching...</div>}
        {editMainProductSearchResults.length > 0 && (
          <div className="bg-white border rounded shadow max-h-40 overflow-y-auto z-50 relative">
            {editMainProductSearchResults.map(prod => (
              <div
                key={prod.asin}
                className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                onClick={() => {
                  if (!editSelectedMainProducts.find(p => p.asin === prod.asin)) {
                    setEditSelectedMainProducts([...editSelectedMainProducts, prod]);
                  }
                  setEditMainProductSearch('');
                  setEditMainProductSearchResults([]);
                }}
              >
                <span className="font-medium">{prod.name}</span>
                <span className="text-gray-400 ml-2">{prod.asin}</span>
              </div>
            ))}
          </div>
        )}
        <DndContext
          onDragEnd={result => {
            if (!result.destination) return;
            const reordered = Array.from(editSelectedMainProducts);
            const [removed] = reordered.splice(result.source.index, 1);
            reordered.splice(result.destination.index, 0, removed);
            setEditSelectedMainProducts(reordered);
          }}
        >
          <DndDroppable droppableId="edit-main-product-list">
            {(provided) => (
              <ul className="list-disc ml-6 mt-2" ref={provided.innerRef} {...provided.droppableProps}>
                {editSelectedMainProducts.length > 0 ? (
                  editSelectedMainProducts.map((prod, idx) => (
                    <DndDraggable key={prod.asin || idx} draggableId={String(prod.asin || idx)} index={idx}>
                      {(draggableProvided) => (
                        <li
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          className="flex items-center justify-between gap-2 bg-gray-100 mb-2 px-2 py-1 rounded cursor-pointer hover:bg-blue-100"
                        >
                          <span>{prod.name} <span className="text-xs text-gray-400">({prod.asin})</span></span>
                          <div className="flex gap-1">
                            <button
                              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                              onClick={async (e) => {
                                e.stopPropagation();
                                const asin = prod.asin;
                                if (!asin) return;
                                const token = localStorage.getItem('token');
                                const res = await axios.get(`https://api.rated.xyz/api/admin/products/${asin}`, {
                                  headers: { Authorization: `Bearer ${token}` }
                                });
                                setEditProductModalOpen(true);
                                setEditProductInitialValues(res.data);
                                setEditProductContext('main');
                                setEditProductIndex(idx);
                              }}
                            >Edit</button>
                            <button
                              className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                              onClick={e => {
                                e.stopPropagation();
                                setEditSelectedMainProducts(editSelectedMainProducts.filter((p, i) => i !== idx));
                              }}
                            >Remove</button>
                          </div>
                        </li>
                      )}
                    </DndDraggable>
                  ))
                ) : (
                  <li className="text-gray-400">No products selected</li>
                )}
                {provided.placeholder}
              </ul>
            )}
          </DndDroppable>
        </DndContext>
      </div>
    </>
  )}

  // Save handler
  const handleSave = async () => {
    if (!selectedId) return;
    setActionLoading(true);
    await axios.patch(`https://api.rated.xyz/api/admin/categories/${selectedId}`,
      {
        name: editName,
        parent_slug: editParent || null,
        meta_title: editMetaTitle,
        meta_description: editMetaDescription,
        category_title: editCategoryTitle,
        subtitle: editSubtitle,
        sponsor_asin: editSelectedSponsor ? editSelectedSponsor.asin : '',
        image_url: editImageUrl,
        faq: editFaqList.filter(Boolean),
        product_asins: editSelectedMainProducts.map(p => p.asin),
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    );
    // Refresh root categories, but do NOT reset expanded or childrenMap
    setLoading(true);
    axios.get('https://api.rated.xyz/api/admin/categories/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setRootCategories(res.data.map((cat: any) => ({
          ...cat,
          id: cat.slug,
          parentId: cat.parent_slug || null,
          hasChildren: true,
          level: 1,
          is_leaf: cat.is_leaf,
        })));
        setLoading(false);
        // After reload, re-expand and scroll to the edited category
        setTimeout(() => {
          expandAndScrollToCategory(selectedId);
        }, 100);
      })
      .catch(() => setLoading(false));
    setActionLoading(false);
  };

  // Delete handler
  const handleDelete = async () => {
    if (!selectedId) return;
    setActionLoading(true);
    await axios.delete(`https://api.rated.xyz/api/admin/categories/${selectedId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setSelectedId(null);
    setSelectedDetails(null);
    // Refresh root and clear childrenMap for fresh state
    setLoading(true);
    axios.get('https://api.rated.xyz/api/admin/categories/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setRootCategories(res.data.map((cat: any) => ({
          ...cat,
          id: cat.slug,
          parentId: cat.parent_slug || null,
          hasChildren: true,
          level: 1,
          is_leaf: cat.is_leaf, // Assuming is_leaf is part of the category data
        })));
        setChildrenMap({});
        setLoading(false);
      })
      .catch(() => setLoading(false));
    setActionLoading(false);
  };

  // Move handler (just update parent_slug)
  const handleMove = async () => {
    if (!selectedId) return;
    setActionLoading(true);
    await axios.patch(`https://api.rated.xyz/api/admin/categories/${selectedId}`, {
      parent_slug: editParent || null,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    // Refresh root and clear childrenMap for fresh state
    setLoading(true);
    axios.get('https://api.rated.xyz/api/admin/categories/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setRootCategories(res.data.map((cat: any) => ({
          ...cat,
          id: cat.slug,
          parentId: cat.parent_slug || null,
          hasChildren: true,
          level: 1,
          is_leaf: cat.is_leaf, // Assuming is_leaf is part of the category data
        })));
        setChildrenMap({});
        setLoading(false);
      })
      .catch(() => setLoading(false));
    setActionLoading(false);
  };

  const handleAddCategory = async () => {
    setAddLoading(true);
    console.log(newParent);
    console.log(newIsLeaf);
    const new_cat = {
      name: newName,
      slug: newSlug,
      parent_slug: newParent || null,
      image_url: newImageUrl || null,
      meta_title: newMetaTitle || null,
      meta_description: newMetaDescription || null,
      category_title: newCategoryTitle || null,
      subtitle: newSubtitle || null,
      sponsor_asin: newSponsorAsin || null,
      is_leaf: newIsLeaf,
      faq: newFaq ? newFaq.split('\n').map(item => item.trim()) : [],
      product_asins: selectedProducts.map(p => p.asin),
    };
    console.log(new_cat);
    await axios.post('https://api.rated.xyz/api/admin/categories/', new_cat, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setShowAddModal(false);
    setNewName('');
    setNewSlug('');
    setNewParent('');
    setNewImageUrl('');
    setNewMetaTitle('');
    setNewMetaDescription('');
    setNewCategoryTitle('');
    setNewSubtitle('');
    setNewSponsorAsin('');
    setNewIsLeaf(false);
    setNewFaq('');
    setNewProductAsins('');
    setSelectedProducts([]);
    setProductSearch('');
    setProductSearchResults([]);
    setAddLoading(false);
    // Refresh root and clear childrenMap for fresh state
    setLoading(true);
    axios.get('https://api.rated.xyz/api/admin/categories/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setRootCategories(res.data.map((cat: any) => ({
          ...cat,
          id: cat.slug,
          parentId: cat.parent_slug || null,
          hasChildren: true,
          level: 1,
          is_leaf: cat.is_leaf, // Assuming is_leaf is part of the category data
        })));
        setChildrenMap({});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Row renderer for react-window
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const node = flatNodes[index];
    return (
      <div
        style={style}
        className={`flex items-center px-2 py-1 cursor-pointer hover:bg-blue-50 select-none ${selectedId === node.id ? 'bg-blue-100' : ''}`}
        onClick={() => setSelectedId(node.id)}
      >
        <span style={{ marginLeft: (node.level - 1) * 20 }} className="flex items-center">
          {node.hasChildren ? (
            expanded[node.id] ? (
              <ChevronDownIcon className="w-4 h-4 mr-1 text-gray-500" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 mr-1 text-gray-500" />
            )
          ) : (
            <span className="w-4 h-4 mr-1" />
          )}
          <span className="truncate">{node.name}</span>
        </span>
      </div>
    );
  };

  // Fetch category details when selectedId changes
  useEffect(() => {
    if (!selectedId) return;
    setDetailsLoading(true);
    axios.get(`https://api.rated.xyz/api/admin/categories/${selectedId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setSelectedDetails(res.data);
        setEditName(res.data.name || '');
        setEditParent(res.data.parent_slug || '');
        setEditMetaTitle(res.data.meta_title || '');
        setEditMetaDescription(res.data.meta_description || '');
        setEditCategoryTitle(res.data.category_title || '');
        setEditSubtitle(res.data.subtitle || '');
        setEditSponsorAsin(res.data.sponsor_asin || '');
        setEditImageUrl(res.data.image_url || '');
        setEditFaqList(Array.isArray(res.data.faq) ? res.data.faq : (res.data.faq ? [res.data.faq] : []));
        setDetailsLoading(false);
      })
      .catch(() => setDetailsLoading(false));
  }, [selectedId]);

  // When selectedDetails changes, update productOrder
  useEffect(() => {
    if (selectedDetails && selectedDetails.is_leaf && selectedDetails.product_asins) {
      setProductOrder([...selectedDetails.product_asins]);
    } else {
      setProductOrder([]);
    }
  }, [selectedDetails]);

  // Handle product drag-and-drop
  const onProductDragEnd = async (result: DndDropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(productOrder);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setProductOrder(reordered);
    // Update backend order
    if (selectedId && selectedDetails && selectedDetails.is_leaf) {
      await axios.patch(`https://api.rated.xyz/api/admin/categories/${selectedId}`, {
        product_asins: reordered
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Optionally, refresh details
      setSelectedDetails({ ...selectedDetails, product_asins: reordered });
    }
  };

  // Handle product click (edit)
  const handleProductClick = (product: any) => {
    setEditingProduct(product);
    setProductEditName(typeof product === 'object' ? product.name : String(product));
    setShowProductModal(true);
  };

  // Handle product save
  const handleProductSave = async () => {
    setProductEditLoading(true);
    // For demo, just update name locally; in real app, PATCH product endpoint
    setProductOrder(order => order.map(p => (p === editingProduct ? { ...p, name: productEditName } : p)));
    setShowProductModal(false);
    setProductEditLoading(false);
  };

  // Compute the level of a category by walking up the parent chain
  function computeLevel(id: string): number {
    let level = 1;
    let currentId = id;
    const allNodes: Record<string, TreeNode> = {};
    rootCategories.forEach(n => { allNodes[n.id] = n; });
    Object.values(childrenMap).flat().forEach(n => { allNodes[n.id] = n; });
    while (allNodes[currentId] && allNodes[currentId].parentId) {
      level += 1;
      currentId = allNodes[currentId].parentId!;
    }
    return level;
  }

  // Helper: delay for async/await
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Helper to robustly expand and scroll to a category in the tree by slug
  const expandAndScrollToCategory = async (slug: string) => {
    // Fetch ancestor chain from backend
    let ancestors: any[] = [];
    try {
      const res = await axios.get(`https://api.rated.xyz/api/admin/categories/${slug}/ancestors`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      ancestors = res.data;
    } catch {
      ancestors = [];
    }
    // Sequentially expand and scroll to each ancestor
    let parentId = null;
    for (const ancestor of ancestors) {
      setExpanded(prev => ({ ...prev, [ancestor.slug]: true }));
      if (!childrenMap[ancestor.slug]) {
        await fetchChildren(ancestor.slug, parentId ? 2 : 1);
      }
      parentId = ancestor.slug;
      // Wait until the ancestor is visible in flatNodes
      let tries = 0;
      while (tries < 20) { // up to 2 seconds
        if (flatNodes.find(n => n.id === ancestor.slug)) break;
        await delay(100);
        tries++;
      }
      if (listRef.current && typeof listRef.current.resetAfterIndex === 'function') {
        listRef.current.resetAfterIndex(0);
        const idx = flatNodes.findIndex(n => n.id === ancestor.slug);
        if (idx !== -1 && typeof listRef.current.scrollToItem === 'function') {
          listRef.current.scrollToItem(idx, 'center');
        }
      }
      await delay(100);
    }
    // Finally, select and scroll to the target node
    setSelectedId(slug);
    let tries = 0;
    while (tries < 20) {
      if (flatNodes.find(n => n.id === slug)) break;
      await delay(100);
      tries++;
    }
    if (listRef.current && typeof listRef.current.resetAfterIndex === 'function') {
      listRef.current.resetAfterIndex(0);
      const idx = flatNodes.findIndex(n => n.id === slug);
      if (idx !== -1 && typeof listRef.current.scrollToItem === 'function') {
        listRef.current.scrollToItem(idx, 'center');
      }
    }
  };

  // Product search effect
  useEffect(() => {
    if (!productSearch) {
      setProductSearchResults([]);
      setProductSearchLoading(false);
      return;
    }
    setProductSearchLoading(true);
    axios.get('https://api.rated.xyz/api/search/products', {
      params: { q: productSearch, size: 10 },
    })
      .then(res => {
        console.log('Product search response:', res.data);
        setProductSearchResults(res.data);
        setProductSearchLoading(false);
      })
      .catch(err => {
        console.error('Product search error:', err);
        setProductSearchResults([]);
        setProductSearchLoading(false);
      });
  }, [productSearch]);

  // Sponsor search effect
  useEffect(() => {
    if (!sponsorSearch) {
      setSponsorSearchResults([]);
      setSponsorSearchLoading(false);
      return;
    }
    setSponsorSearchLoading(true);
    axios.get('https://api.rated.xyz/api/search/products', {
      params: { q: sponsorSearch, size: 10 },
    })
      .then(res => {
        setSponsorSearchResults(res.data);
        setSponsorSearchLoading(false);
      })
      .catch(() => {
        setSponsorSearchResults([]);
        setSponsorSearchLoading(false);
      });
  }, [sponsorSearch]);

  // In the useEffect that runs when selectedDetails changes, set the sponsor search input if sponsor_product exists
  useEffect(() => {
    if (selectedDetails && selectedDetails.is_leaf) {
      setEditSponsorSearch(selectedDetails.sponsor_product ? (selectedDetails.sponsor_product.name + ' (' + selectedDetails.sponsor_product.asin + ')') : '');
      setEditSponsorSearchResults([]);
      setEditSponsorSearchLoading(false);
      setEditSelectedSponsor(selectedDetails.sponsor_product || null);
      setEditMainProductSearch('');
      setEditMainProductSearchResults([]);
      setEditMainProductSearchLoading(false);
      // If main_products is available, use it; else use product_asins
      if (Array.isArray(selectedDetails.main_products) && selectedDetails.main_products.length > 0) {
        setEditSelectedMainProducts(selectedDetails.main_products);
      } else if (Array.isArray(selectedDetails.product_asins) && selectedDetails.product_asins.length > 0) {
        setEditSelectedMainProducts(selectedDetails.product_asins.map((asin: any) => typeof asin === 'object' ? asin : { asin }));
      } else {
        setEditSelectedMainProducts([]);
      }
    }
  }, [selectedDetails]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top search bar (to be updated for real API) */}
      <div className="p-4 bg-white shadow flex items-center relative">
        <input
          type="text"
          placeholder="Search categories..."
          className="border rounded px-3 py-2 w-full max-w-lg"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {searching && (
          <div className="absolute left-0 top-12 w-full max-w-lg bg-white border rounded shadow z-10 p-2 text-gray-500">Searching...</div>
        )}
        {searchResults.length > 0 && (
          <div className="absolute left-0 top-12 w-full max-w-lg bg-white border rounded shadow z-10">
            {searchResults.slice(0, 10).map((cat, i) => (
              <div
                key={cat.id}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                onClick={() => handleSearchSelect(cat)}
              >
                <span className="font-medium">{cat.name}</span>
                <span className="text-gray-400 ml-2">{cat.path}</span>
              </div>
            ))}
            {searchResults.length > 10 && <div className="px-4 py-2 text-xs text-gray-400">...and more</div>}
          </div>
        )}
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Tree view */}
        <div className="w-1/3 bg-white border-r overflow-auto">
          <button
            className="m-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setShowAddModal(true)}
          >
            Add Category
          </button>
          {loading ? (
            <div className="p-4 text-gray-700">Loading categories...</div>
          ) : (
            <List
              height={600}
              itemCount={flatNodes.length}
              itemSize={36}
              width={"100%"}
              ref={listRef}
            >
              {({ index, style }) => {
                const node = flatNodes[index];
                return (
                  <div
                    key={node.id}
                    style={style}
                    className={`flex items-center px-2 py-1 cursor-pointer hover:bg-blue-50 select-none ${selectedId === node.id ? 'bg-blue-100' : ''}`}
                    onClick={() => handleToggle(node)}
                  >
                    <span style={{ marginLeft: (node.level - 1) * 20 }} className="flex items-center">
                      {node.hasChildren ? (
                        loadingMap[node.id] ? (
                          <span className="w-4 h-4 mr-1 animate-spin border-2 border-blue-400 border-t-transparent rounded-full"></span>
                        ) : expanded[node.id] ? (
                          <ChevronDownIcon className="w-4 h-4 mr-1 text-gray-500" />
                        ) : (
                          <ChevronRightIcon className="w-4 h-4 mr-1 text-gray-500" />
                        )
                      ) : (
                        <span className="w-4 h-4 mr-1" />
                      )}
                      <span className="truncate">{node.name}</span>
                    </span>
                  </div>
                );
              }}
            </List>
          )}
          <Modal
            isOpen={showAddModal}
            onRequestClose={() => setShowAddModal(false)}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-30"
            ariaHideApp={false}
          >
            <div className="bg-white p-6 rounded shadow w-full max-w-4xl min-h-[700px]">
              <h2 className="text-xl font-bold mb-4">Add Category</h2>
              <div className="mb-4 border-b flex gap-4">
                <button className={`pb-2 px-2 ${addTab === 'general' ? 'border-b-2 border-blue-600 font-bold' : ''}`} onClick={() => setAddTab('general')}>General</button>
                <button className={`pb-2 px-2 ${addTab === 'seo' ? 'border-b-2 border-blue-600 font-bold' : ''}`} onClick={() => setAddTab('seo')}>SEO</button>
                <button className={`pb-2 px-2 ${addTab === 'product' ? 'border-b-2 border-blue-600 font-bold' : ''}`} onClick={() => setAddTab('product')}>Product</button>
                <button className={`pb-2 px-2 ${addTab === 'faq' ? 'border-b-2 border-blue-600 font-bold' : ''}`} onClick={() => setAddTab('faq')}>FAQ</button>
              </div>
              {addTab === 'general' && (
                <>
                  <div className="mb-3 flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block mb-1">Name</label>
                      <input value={newName} onChange={e => setNewName(e.target.value)} className="w-full border rounded px-2 py-1 mb-2" required />
                      <label className="block mb-1">Slug</label>
                      <input value={newSlug} onChange={e => setNewSlug(e.target.value)} className="w-full border rounded px-2 py-1" required />
                    </div>
                    {newImageUrl && (
                      <div className="flex flex-col items-center min-w-[80px] justify-center">
                        <img src={newImageUrl} alt="Preview" className="h-16 w-16 object-contain mb-1 border rounded" />
                        <span className="text-xs text-gray-500">Preview</span>
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block mb-1">Parent</label>
                    <Select
                      options={addParentOptions}
                      value={addParentOptions.find(opt => opt.value === newParent) || null}
                      onChange={opt => setNewParent(opt ? opt.value : '')}
                      isClearable
                      placeholder="No parent (top-level)"
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block mb-1">Image URL</label>
                    <input value={newImageUrl || ''} onChange={e => setNewImageUrl(e.target.value)} className="w-full border rounded px-2 py-1" />
                  </div>
                  <div className="mb-3 flex items-center gap-2">
                    <input type="checkbox" id="isLeaf" checked={newIsLeaf} onChange={e => setNewIsLeaf(e.target.checked)} />
                    <label htmlFor="isLeaf" className="mb-0">Leaf State</label>
                  </div>
                </>
              )}
              {addTab === 'seo' && (
                <>
                  <div className="mb-3">
                    <label className="block mb-1">Meta Title</label>
                    <input value={newMetaTitle || ''} onChange={e => setNewMetaTitle(e.target.value)} className="w-full border rounded px-2 py-1" />
                  </div>
                  <div className="mb-3">
                    <label className="block mb-1">Meta Description</label>
                    <textarea value={newMetaDescription || ''} onChange={e => setNewMetaDescription(e.target.value)} className="w-full border rounded px-2 py-1" />
                  </div>
                  <div className="mb-3">
                    <label className="block mb-1">Category Title</label>
                    <input value={newCategoryTitle || ''} onChange={e => setNewCategoryTitle(e.target.value)} className="w-full border rounded px-2 py-1" />
                  </div>
                  <div className="mb-3">
                    <label className="block mb-1">Subtitle</label>
                    <input value={newSubtitle || ''} onChange={e => setNewSubtitle(e.target.value)} className="w-full border rounded px-2 py-1" />
                  </div>
                </>
              )}
              {addTab === 'product' && (
                <>
                  <div className="mb-3">
                    <label className="block mb-1">Sponsor ASIN</label>
                    <input
                      type="text"
                      value={sponsorSearch}
                      onChange={e => setSponsorSearch(e.target.value)}
                      className="w-full border rounded px-2 py-1 mb-1"
                      placeholder="Search sponsor by name or ASIN"
                    />
                    {sponsorSearchLoading && <div className="text-xs text-gray-500">Searching...</div>}
                    {sponsorSearchResults.length > 0 && (
                      <div className="bg-white border rounded shadow max-h-40 overflow-y-auto z-50 relative">
                        {sponsorSearchResults.map(prod => (
                          <div
                            key={prod.asin}
                            className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                            onClick={() => {
                              setSelectedSponsor(prod);
                              setNewSponsorAsin(prod.asin);
                              setSponsorSearch(prod.name + ' (' + prod.asin + ')');
                              setSponsorSearchResults([]);
                            }}
                          >
                            <span className="font-medium">{prod.name}</span>
                            <span className="text-gray-400 ml-2">{prod.asin}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {selectedSponsor && (
                      <div className="text-xs text-gray-600 mt-1">Selected: {selectedSponsor.name} <span className="text-gray-400">({selectedSponsor.asin})</span></div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block mb-1">Add Main Products</label>
                    <input
                      type="text"
                      value={productSearch}
                      onChange={e => setProductSearch(e.target.value)}
                      className="w-full border rounded px-2 py-1 mb-1"
                      placeholder="Search products by name or ASIN"
                    />
                    {productSearchLoading && <div className="text-xs text-gray-500">Searching...</div>}
                    {productSearchResults.length > 0 && (
                      <div className="bg-white border rounded shadow max-h-40 overflow-y-auto z-50 relative">
                        {productSearchResults.map(prod => (
                          <div
                            key={prod.asin}
                            className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                            onClick={() => {
                              if (!selectedProducts.find(p => p.asin === prod.asin)) {
                                setSelectedProducts([...selectedProducts, prod]);
                              }
                              setProductSearch('');
                              setProductSearchResults([]);
                            }}
                          >
                            <span className="font-medium">{prod.name}</span>
                            <span className="text-gray-400 ml-2">{prod.asin}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <DndContext
                      onDragEnd={result => {
                        if (!result.destination) return;
                        const reordered = Array.from(selectedProducts);
                        const [removed] = reordered.splice(result.source.index, 1);
                        reordered.splice(result.destination.index, 0, removed);
                        setSelectedProducts(reordered);
                      }}
                    >
                      <DndDroppable droppableId="add-product-list">
                        {(provided) => (
                          <ul className="list-disc ml-6 mt-2" ref={provided.innerRef} {...provided.droppableProps}>
                            {selectedProducts.length > 0 ? (
                              selectedProducts.map((prod, idx) => (
                                <DndDraggable key={prod.asin || idx} draggableId={String(prod.asin || idx)} index={idx}>
                                  {(draggableProvided) => (
                                    <li
                                      ref={draggableProvided.innerRef}
                                      {...draggableProvided.draggableProps}
                                      {...draggableProvided.dragHandleProps}
                                      className="flex items-center justify-between gap-2 bg-gray-100 mb-2 px-2 py-1 rounded cursor-pointer hover:bg-blue-100"
                                    >
                                      <span>{prod.name} <span className="text-xs text-gray-400">({prod.asin})</span></span>
                                      <button
                                        className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                                        onClick={e => {
                                          e.stopPropagation();
                                          setSelectedProducts(selectedProducts.filter(p => p.asin !== prod.asin));
                                        }}
                                      >Remove</button>
                                    </li>
                                  )}
                                </DndDraggable>
                              ))
                            ) : (
                              <li className="text-gray-400">No products selected</li>
                            )}
                            {provided.placeholder}
                          </ul>
                        )}
                      </DndDroppable>
                    </DndContext>
                  </div>
                </>
              )}
              {addTab === 'faq' && (
                <div className="mb-3">
                  <label className="block mb-1">FAQ (one per line)</label>
                  <textarea value={newFaq || ''} onChange={e => setNewFaq(e.target.value)} className="w-full border rounded px-2 py-1" placeholder="Enter each FAQ on a new line" />
                </div>
              )}
              <div className="flex gap-2 mt-6">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleAddCategory}
                  disabled={addLoading}
                >
                  {addLoading ? 'Adding...' : 'Add'}
                </button>
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </div>
          </Modal>
        </div>
        {/* Right: Category detail */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="bg-white rounded shadow p-6 min-h-[200px]">
            {detailsLoading ? (
              <div>Loading details...</div>
            ) : selectedDetails ? (
              <>
                <div className="mb-4 border-b flex gap-4">
                  <button className={`pb-2 px-2 ${activeTab === 'general' ? 'border-b-2 border-blue-600 font-bold' : ''}`} onClick={() => setActiveTab('general')}>General</button>
                  <button className={`pb-2 px-2 ${activeTab === 'seo' ? 'border-b-2 border-blue-600 font-bold' : ''}`} onClick={() => setActiveTab('seo')}>SEO</button>
                  {selectedDetails.is_leaf && (
                    <button className={`pb-2 px-2 ${activeTab === 'product' ? 'border-b-2 border-blue-600 font-bold' : ''}`} onClick={() => setActiveTab('product')}>Product</button>
                  )}
                  <button className={`pb-2 px-2 ${activeTab === 'faq' ? 'border-b-2 border-blue-600 font-bold' : ''}`} onClick={() => setActiveTab('faq')}>FAQ</button>
                </div>
                {activeTab === 'general' && (
                  <>
                    <div className="mb-4 flex flex-row items-center gap-4">
                      <div className="flex flex-col flex-1 justify-center">
                        <label className="block text-gray-600 mb-1">Name</label>
                        <input className="border rounded px-2 py-1 w-full mb-2" value={editName} onChange={e => setEditName(e.target.value)} />
                        <label className="block text-gray-600 mb-1">Slug</label>
                        <input className="border rounded px-2 py-1 w-full" value={selectedDetails.slug || ''} readOnly />
                      </div>
                      {selectedDetails.image_url && (
                        <div className="flex flex-col items-center min-w-[128px] justify-center">
                          <img src={selectedDetails.image_url} alt="Category" className="h-36 w-36 object-contain mb-1 border rounded" />
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 mb-1">Level</label>
                      <input className="border rounded px-2 py-1 w-full" value={selectedId ? computeLevel(selectedId) : ''} readOnly />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 mb-1">Parent</label>
                      <Select
                        options={editParentOptions}
                        value={editParentOptions.find(opt => opt.value === editParent) || null}
                        onChange={opt => setEditParent(opt ? opt.value : '')}
                        isClearable
                        placeholder="No parent (top-level)"
                        classNamePrefix="react-select"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 mb-1">Leaf State</label>
                      <input className="border rounded px-2 py-1 w-full" value={selectedDetails.is_leaf ? 'Yes' : 'No'} readOnly />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 mb-1">Image URL</label>
                      <input className="border rounded px-2 py-1 w-full" value={editImageUrl} onChange={e => setEditImageUrl(e.target.value)} />
                    </div>
                  </>
                )}
                {activeTab === 'seo' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-600 mb-1">Meta Title</label>
                      <input className="border rounded px-2 py-1 w-full" value={editMetaTitle} onChange={e => setEditMetaTitle(e.target.value)} />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 mb-1">Meta Description</label>
                      <textarea className="border rounded px-2 py-1 w-full" value={editMetaDescription} onChange={e => setEditMetaDescription(e.target.value)} />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 mb-1">Category Title</label>
                      <input className="border rounded px-2 py-1 w-full" value={editCategoryTitle} onChange={e => setEditCategoryTitle(e.target.value)} />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 mb-1">Subtitle</label>
                      <input className="border rounded px-2 py-1 w-full" value={editSubtitle} onChange={e => setEditSubtitle(e.target.value)} />
                    </div>
                  </>
                )}
                {activeTab === 'product' && (
                  <>
                    {/* Sponsor Product Search */}
                    <div className="mb-3">
                      <label className="block mb-1">Sponsor ASIN</label>
                      {/* --- Sponsor Product Search --- */}
                      <div className="flex gap-2 mb-1">
                        <input
                          type="text"
                          value={editSponsorSearch}
                          onChange={async e => {
                            const value = e.target.value;
                            setEditSponsorSearch(value);
                            if (!value.trim()) {
                              setEditSponsorSearchResults([]);
                              setEditSponsorSearchLoading(false);
                              return;
                            }
                            setEditSponsorSearchLoading(true);
                            const res = await axios.get('https://api.rated.xyz/api/search/products', { params: { q: value } });
                            setEditSponsorSearchResults(res.data);
                            setEditSponsorSearchLoading(false);
                          }}
                          className="w-full border rounded px-2 py-1"
                          placeholder="Search sponsor by name or ASIN"
                        />
                        <button
                          className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                          type="button"
                          onClick={() => { setShowCreateProductModal(true); setCreateProductContext('sponsor'); }}
                        >Create Product</button>
                      </div>
                      {editSponsorSearchLoading && <div className="text-xs text-gray-500">Searching...</div>}
                      {editSponsorSearchResults.length > 0 && (
                        <div className="bg-white border rounded shadow max-h-40 overflow-y-auto z-50 relative">
                          {editSponsorSearchResults.map(prod => (
                            <div
                              key={prod.asin}
                              className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                              onClick={() => {
                                setEditSelectedSponsor(prod);
                                setEditSponsorSearch(prod.name + ' (' + prod.asin + ')');
                                setEditSponsorSearchResults([]);
                              }}
                            >
                              <span className="font-medium">{prod.name}</span>
                              <span className="text-gray-400 ml-2">{prod.asin}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* --- Sponsor Product Edit/Remove Buttons --- */}
                      {(editSelectedSponsor || selectedDetails.sponsor_asin) && (
                        <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded mt-2">
                          <span className="font-mono">
                            {editSelectedSponsor
                              ? `${editSelectedSponsor.name} (${editSelectedSponsor.asin})`
                              : selectedDetails.sponsor_asin}
                          </span>
                          <button
                            className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                            onClick={async () => {
                              const asin = editSelectedSponsor?.asin || selectedDetails.sponsor_asin;
                              if (!asin) return;
                              const token = localStorage.getItem('token');
                              const res = await axios.get(`https://api.rated.xyz/api/admin/products/${asin}`, {
                                headers: { Authorization: `Bearer ${token}` }
                              });
                              setEditProductModalOpen(true);
                              setEditProductInitialValues(res.data);
                              setEditProductContext('sponsor');
                              setEditProductIndex(null);
                            }}
                          >Edit</button>
                          <button
                            className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                            onClick={() => {
                              setEditSelectedSponsor(null);
                              setEditSponsorSearch('');
                              setSelectedDetails({ ...selectedDetails, sponsor_asin: null });
                            }}
                          >Remove</button>
                        </div>
                      )}
                    </div>
                    {/* Main Products Search and List */}
                    <div className="mb-3">
                      <label className="block mb-1">Add Main Products</label>
                      {/* --- Main Product Search --- */}
                      <div className="flex gap-2 mb-1">
                        <input
                          type="text"
                          value={editMainProductSearch}
                          onChange={async e => {
                            const value = e.target.value;
                            setEditMainProductSearch(value);
                            if (!value.trim()) {
                              setEditMainProductSearchResults([]);
                              setEditMainProductSearchLoading(false);
                              return;
                            }
                            setEditMainProductSearchLoading(true);
                            const res = await axios.get('https://api.rated.xyz/api/search/products', { params: { q: value } });
                            setEditMainProductSearchResults(res.data);
                            setEditMainProductSearchLoading(false);
                          }}
                          className="w-full border rounded px-2 py-1"
                          placeholder="Search products by name or ASIN"
                        />
                        <button
                          className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                          type="button"
                          onClick={() => { setShowCreateProductModal(true); setCreateProductContext('main'); }}
                        >Create Product</button>
                      </div>
                      {editMainProductSearchLoading && <div className="text-xs text-gray-500">Searching...</div>}
                      {editMainProductSearchResults.length > 0 && (
                        <div className="bg-white border rounded shadow max-h-40 overflow-y-auto z-50 relative">
                          {editMainProductSearchResults.map(prod => (
                            <div
                              key={prod.asin}
                              className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                              onClick={() => {
                                if (!editSelectedMainProducts.find(p => p.asin === prod.asin)) {
                                  setEditSelectedMainProducts([...editSelectedMainProducts, prod]);
                                }
                                setEditMainProductSearch('');
                                setEditMainProductSearchResults([]);
                              }}
                            >
                              <span className="font-medium">{prod.name}</span>
                              <span className="text-gray-400 ml-2">{prod.asin}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <DndContext
                        onDragEnd={result => {
                          if (!result.destination) return;
                          const reordered = Array.from(editSelectedMainProducts);
                          const [removed] = reordered.splice(result.source.index, 1);
                          reordered.splice(result.destination.index, 0, removed);
                          setEditSelectedMainProducts(reordered);
                        }}
                      >
                        <DndDroppable droppableId="edit-main-product-list">
                          {(provided) => (
                            <ul className="list-disc ml-6 mt-2" ref={provided.innerRef} {...provided.droppableProps}>
                              {editSelectedMainProducts.length > 0 ? (
                                editSelectedMainProducts.map((prod, idx) => (
                                  <DndDraggable key={prod.asin || idx} draggableId={String(prod.asin || idx)} index={idx}>
                                    {(draggableProvided) => (
                                      <li
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                        className="flex items-center justify-between gap-2 bg-gray-100 mb-2 px-2 py-1 rounded cursor-pointer hover:bg-blue-100"
                                      >
                                        <span>{prod.name} <span className="text-xs text-gray-400">({prod.asin})</span></span>
                                        <div className="flex gap-1">
                                          <button
                                            className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                                            onClick={async (e) => {
                                              e.stopPropagation();
                                              const asin = prod.asin;
                                              if (!asin) return;
                                              const token = localStorage.getItem('token');
                                              const res = await axios.get(`https://api.rated.xyz/api/admin/products/${asin}`, {
                                                headers: { Authorization: `Bearer ${token}` }
                                              });
                                              setEditProductModalOpen(true);
                                              setEditProductInitialValues(res.data);
                                              setEditProductContext('main');
                                              setEditProductIndex(idx);
                                            }}
                                          >Edit</button>
                                          <button
                                            className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                                            onClick={e => {
                                              e.stopPropagation();
                                              setEditSelectedMainProducts(editSelectedMainProducts.filter((p, i) => i !== idx));
                                            }}
                                          >Remove</button>
                                        </div>
                                      </li>
                                    )}
                                  </DndDraggable>
                                ))
                              ) : (
                                <li className="text-gray-400">No products selected</li>
                              )}
                              {provided.placeholder}
                            </ul>
                          )}
                        </DndDroppable>
                      </DndContext>
                    </div>
                  </>
                )}
                {activeTab === 'faq' && (
                  <div className="mb-4">
                    <ul className="mb-2">
                      {editFaqList.length > 0 ? (
                        editFaqList.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 mb-2">
                            <input
                              className="border rounded px-2 py-1 w-full"
                              value={item}
                              onChange={e => {
                                const newList = [...editFaqList];
                                newList[idx] = e.target.value;
                                setEditFaqList(newList);
                              }}
                              placeholder={`FAQ #${idx + 1}`}
                            />
                            <button
                              className="bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                              onClick={() => setEditFaqList(editFaqList.filter((_, i) => i !== idx))}
                              type="button"
                            >Remove</button>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-400">No FAQ</li>
                      )}
                    </ul>
                    <button
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                      onClick={() => setEditFaqList([...editFaqList, ''])}
                      type="button"
                    >Add FAQ</button>
                  </div>
                )}
                <div className="flex gap-2 mt-6">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave} disabled={actionLoading}>Save</button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete} disabled={actionLoading}>Delete</button>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={async () => {
                      if (!selectedDetails) return;
                      if (selectedDetails.is_leaf) {
                        window.open(`/${selectedDetails.slug}`, '_blank');
                      } else {
                        // Fetch ancestors to build the full path
                        try {
                          const res = await axios.get(`https://api.rated.xyz/api/admin/categories/${selectedDetails.slug}/ancestors`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                          });
                          const ancestors = res.data; // array of {slug, ...}
                          const path = ancestors.map(a => a.slug).concat(selectedDetails.slug).join('/');
                          window.open(`/category/${path}`, '_blank');
                        } catch (e) {
                          window.open(`/category/${selectedDetails.slug}`, '_blank'); // fallback
                        }
                      }
                    }}
                    disabled={!selectedDetails}
                  >View</button>
                </div>
                {actionLoading && <div className="mt-2 text-blue-500">Processing...</div>}
              </>
            ) : (
              <div className="text-gray-400">Select a category to view details</div>
            )}
          </div>
          <Modal
            isOpen={showProductModal}
            onRequestClose={() => setShowProductModal(false)}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-30"
            ariaHideApp={false}
          >
            <div className="bg-white p-6 rounded shadow w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <div className="mb-3">
                <label className="block mb-1">Name</label>
                <input value={productEditName} onChange={e => setProductEditName(e.target.value)} className="w-full border rounded px-2 py-1" required />
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleProductSave}
                  disabled={productEditLoading}
                >
                  {productEditLoading ? 'Saving...' : 'Save'}
                </button>
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowProductModal(false)}>Cancel</button>
              </div>
            </div>
          </Modal>
          <ProductModal
            open={showCreateProductModal}
            onClose={() => setShowCreateProductModal(false)}
            onSubmit={async (values) => {
              setCreateProductLoading(true);
              setCreateProductError('');
              try {
                const token = localStorage.getItem('token');
                const res = await axios.post('https://api.rated.xyz/api/admin/products', values, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                if (createProductContext === 'sponsor') {
                  setEditSelectedSponsor(res.data);
                  setEditSponsorSearch(res.data.name + ' (' + res.data.asin + ')');
                } else if (createProductContext === 'main') {
                  setEditSelectedMainProducts(prev => [...prev, res.data]);
                }
                setShowCreateProductModal(false);
              } catch (e: any) {
                setCreateProductError(e.response?.data?.detail || 'Error creating product');
              }
              setCreateProductLoading(false);
            }}
          />
          <ProductModal
            open={editProductModalOpen}
            onClose={() => setEditProductModalOpen(false)}
            initialValues={editProductInitialValues}
            onSubmit={async (values) => {
              try {
                const token = localStorage.getItem('token');
                await axios.patch(`https://api.rated.xyz/api/admin/products/${values.asin}`, values, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                if (editProductContext === 'sponsor') {
                  setEditSelectedSponsor(values);
                  setEditSponsorSearch(values.name + ' (' + values.asin + ')');
                } else if (editProductContext === 'main' && editProductIndex !== null) {
                  setEditSelectedMainProducts(prev => prev.map((p, i) => i === editProductIndex ? values : p));
                }
                setEditProductModalOpen(false);
              } catch (e) {
                // Optionally handle error
                setEditProductModalOpen(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
} 