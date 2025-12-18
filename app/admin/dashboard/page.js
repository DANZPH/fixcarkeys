'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
    Settings, Wrench, MessageSquare, Car, MapPin, FileText,
    LogOut, RefreshCw, Plus, Search, Trash2, Edit, X, Save,
    Check, AlertTriangle, ChevronLeft, ChevronRight, Sliders
} from 'lucide-react';

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('settings');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Data states
    const [settings, setSettings] = useState({});
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [brands, setBrands] = useState([]);
    const [areas, setAreas] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch('/api/auth/check');
            const data = await res.json();

            if (!data.authenticated) {
                router.push('/admin');
                return;
            }

            await loadAllData();
            setLoading(false);
        } catch (error) {
            router.push('/admin');
        }
    };

    const loadAllData = async () => {
        try {
            const [settingsRes, servicesRes, testimonialsRes, brandsRes, areasRes, blogRes] = await Promise.all([
                fetch('/api/admin/settings'),
                fetch('/api/admin/services'),
                fetch('/api/admin/testimonials'),
                fetch('/api/admin/brands'),
                fetch('/api/admin/areas'),
                fetch('/api/admin/blog'),
            ]);

            setSettings(await settingsRes.json());
            setServices(await servicesRes.json());
            setTestimonials(await testimonialsRes.json());
            setBrands(await brandsRes.json());
            setAreas(await areasRes.json());
            setBlogPosts(await blogRes.json());
        } catch (error) {
            console.error('Error loading data:', error);
            showMessage('error', 'Failed to load data. Make sure to initialize the database.');
        }
    };

    const initDatabase = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/init', { method: 'POST' });
            if (res.ok) {
                showMessage('success', 'Database initialized successfully!');
                await loadAllData();
            } else {
                const data = await res.json();
                showMessage('error', data.error || 'Failed to initialize database');
            }
        } catch (error) {
            showMessage('error', 'Failed to initialize database');
        } finally {
            setSaving(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin');
    };

    const saveSettings = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                showMessage('success', 'Information updated successfully!');
            } else {
                showMessage('error', 'Failed to update information');
            }
        } catch (error) {
            showMessage('error', 'Update failed');
        } finally {
            setSaving(false);
        }
    };

    const openModal = (type, item = null) => {
        setModalType(type);
        setEditItem(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditItem(null);
    };

    const handleSaveItem = async (type, data) => {
        setSaving(true);
        try {
            const endpoint = `/api/admin/${type}`;
            const method = editItem ? 'PUT' : 'POST';
            const body = editItem ? { ...data, id: editItem.id } : data;

            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                showMessage('success', `${type.slice(0, -1)} saved successfully!`);
                await loadAllData();
                closeModal();
            } else {
                showMessage('error', `Failed to save ${type.slice(0, -1)}`);
            }
        } catch (error) {
            showMessage('error', 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteItem = async (type, id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const res = await fetch(`/api/admin/${type}?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                showMessage('success', 'Item deleted successfully!');
                await loadAllData();
            } else {
                showMessage('error', 'Failed to delete item');
            }
        } catch (error) {
            showMessage('error', 'Delete failed');
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                fontFamily: 'sans-serif'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
                    <p style={{ color: '#718096', fontSize: '1.2rem', fontWeight: 500 }}>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const menuItems = [
        { id: 'settings', label: 'Site Info', icon: <Settings size={20} /> },
        { id: 'services', label: 'Services', icon: <Wrench size={20} /> },
        { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={20} /> },
        { id: 'brands', label: 'Car Brands', icon: <Car size={20} /> },
        { id: 'areas', label: 'Service Areas', icon: <MapPin size={20} /> },
        { id: 'blog', label: 'Blog Posts', icon: <FileText size={20} /> },
    ];

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            backgroundColor: '#f8f9fa',
            overflow: 'hidden'
        }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                backgroundColor: '#1a1f2e',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '4px 0 24px rgba(0,0,0,0.1)',
                zIndex: 20
            }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
                        FixCarKeys
                    </h1>
                    <p style={{ color: '#718096', fontSize: '0.75rem', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Admin Panel</p>
                </div>

                <nav style={{ flex: 1, padding: '1.5rem 0', overflowY: 'auto' }}>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                width: '100%',
                                padding: '1rem 2rem',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                transition: 'all 0.2s',
                                fontSize: '0.95rem',
                                borderLeft: activeTab === item.id ? '4px solid #778873' : '4px solid transparent',
                                backgroundColor: activeTab === item.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                                color: activeTab === item.id ? 'white' : '#a0aec0',
                                fontWeight: activeTab === item.id ? '600' : '500',
                                cursor: 'pointer'
                            }}
                            onMouseOver={(e) => {
                                if (activeTab !== item.id) {
                                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                                    e.currentTarget.style.color = '#fff';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (activeTab !== item.id) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#a0aec0';
                                }
                            }}
                        >
                            <span style={{ opacity: activeTab === item.id ? 1 : 0.7 }}>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#151926' }}>
                    <button
                        onClick={initDatabase}
                        disabled={saving}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            marginBottom: '0.5rem',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontSize: '0.85rem',
                            color: '#a0aec0',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <RefreshCw size={16} />
                        Initialize Database
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontSize: '0.85rem',
                            color: '#e53e3e',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(229,62,62,0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f8f9fa', position: 'relative' }}>
                {/* Top Bar */}
                <div style={{
                    backgroundColor: 'white',
                    borderBottom: '1px solid #e2e8f0',
                    padding: '1.5rem 2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10
                }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a202c', textTransform: 'capitalize' }}>
                        {activeTab === 'settings' ? 'Site Information' : activeTab}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.85rem', color: '#718096', fontWeight: 500 }}>v1.0.0</span>
                    </div>
                </div>

                {/* Message Toast */}
                {message.text && (
                    <div style={{
                        position: 'fixed',
                        top: '1.5rem',
                        right: '1.5rem',
                        padding: '1rem 1.5rem',
                        backgroundColor: message.type === 'success' ? '#48bb78' : '#f56565',
                        color: 'white',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        animation: 'slideIn 0.3s ease-out'
                    }}>
                        <span>{message.type === 'success' ? '✓' : '!'}</span>
                        {message.text}
                    </div>
                )}

                <div style={{ padding: '2.5rem', maxWidth: '1600px', margin: '0 auto' }}>
                    {activeTab === 'settings' && (
                        <SettingsPanel
                            settings={settings}
                            setSettings={setSettings}
                            onSave={saveSettings}
                            saving={saving}
                        />
                    )}

                    {activeTab === 'services' && (
                        <DataPanel
                            title="Services"
                            description="Manage the services offered to customers."
                            data={services}
                            onAdd={() => openModal('services')}
                            onEdit={(item) => openModal('services', item)}
                            onDelete={(id) => handleDeleteItem('services', id)}
                            columns={['icon', 'title', 'description']}
                        />
                    )}

                    {activeTab === 'testimonials' && (
                        <DataPanel
                            title="Testimonials"
                            description="What customers are saying about us."
                            data={testimonials}
                            onAdd={() => openModal('testimonials')}
                            onEdit={(item) => openModal('testimonials', item)}
                            onDelete={(id) => handleDeleteItem('testimonials', id)}
                            columns={['name', 'designation', 'quote']}
                        />
                    )}

                    {activeTab === 'brands' && (
                        <DataPanel
                            title="Car Brands"
                            description="Vehicle brands currently serviced."
                            data={brands}
                            onAdd={() => openModal('brands')}
                            onEdit={(item) => openModal('brands', item)}
                            onDelete={(id) => handleDeleteItem('brands', id)}
                            columns={['name', 'description', 'logo_url']}
                        />
                    )}

                    {activeTab === 'areas' && (
                        <DataPanel
                            title="Service Areas"
                            description="Locations where services are provided."
                            data={areas}
                            onAdd={() => openModal('areas')}
                            onEdit={(item) => openModal('areas', item)}
                            onDelete={(id) => handleDeleteItem('areas', id)}
                            columns={['name', 'towns']}
                        />
                    )}

                    {activeTab === 'blog' && (
                        <DataPanel
                            title="Blog Posts"
                            description="Articles and news updates."
                            data={blogPosts}
                            onAdd={() => openModal('blog')}
                            onEdit={(item) => openModal('blog', item)}
                            onDelete={(id) => handleDeleteItem('blog', id)}
                            columns={['title', 'category', 'excerpt']}
                        />
                    )}
                </div>
            </main>

            {/* Edit Modal */}
            {showModal && (
                <EditModal
                    type={modalType}
                    item={editItem}
                    onSave={(data) => handleSaveItem(modalType, data)}
                    onClose={closeModal}
                    saving={saving}
                />
            )}
        </div>
    );
}

// Settings Panel Component
function SettingsPanel({ settings, setSettings, onSave, saving }) {
    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const settingGroups = [
        {
            title: 'Contact Information',
            fields: [
                { key: 'phone_number', label: 'Phone Number', type: 'text' },
                { key: 'whatsapp_number', label: 'WhatsApp (without +)', type: 'text' },
                { key: 'email', label: 'Email Address', type: 'email' },
                { key: 'address', label: 'Office Address', type: 'text' },
                { key: 'hours', label: 'Working Hours', type: 'text' },
            ]
        },
        {
            title: 'Social Media (Follow Us)',
            fields: [
                { key: 'facebook_url', label: 'Facebook URL', type: 'text' },
                { key: 'instagram_url', label: 'Instagram URL', type: 'text' },
                { key: 'tiktok_url', label: 'TikTok URL', type: 'text' },
            ]
        },
        {
            title: 'Hero Statistics',
            fields: [
                { key: 'hero_stat_1_value', label: 'Stat 1 Value (e.g. 24/7)', type: 'text' },
                { key: 'hero_stat_1_label', label: 'Stat 1 Label (e.g. Emergency Service)', type: 'text' },
                { key: 'hero_stat_2_value', label: 'Stat 2 Value (e.g. 15+)', type: 'text' },
                { key: 'hero_stat_2_label', label: 'Stat 2 Label (e.g. Years Experience)', type: 'text' },
                { key: 'hero_stat_3_value', label: 'Stat 3 Value (e.g. 100%)', type: 'text' },
                { key: 'hero_stat_3_label', label: 'Stat 3 Label (e.g. Satisfaction)', type: 'text' },
            ]
        }
    ];

    return (
        <div style={{ maxWidth: '1000px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2d3748' }}>Dashboard Settings</h3>
                    <p style={{ color: '#718096', fontSize: '0.9rem', marginTop: '0.25rem' }}>Manage your website content and global settings</p>
                </div>
                <button
                    onClick={onSave}
                    disabled={saving}
                    style={{
                        backgroundColor: '#778873',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        opacity: saving ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 6px rgba(119, 136, 115, 0.2)'
                    }}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {settingGroups.map(group => (
                    <div key={group.title} style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}>
                        <div style={{
                            padding: '1.25rem 2rem',
                            borderBottom: '1px solid #edf2f7',
                            backgroundColor: '#f8fafc'
                        }}>
                            <h3 style={{
                                fontSize: '0.85rem',
                                fontWeight: '700',
                                color: '#4a5568',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {group.title}
                            </h3>
                        </div>
                        <div style={{ padding: '2rem' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                {group.fields.map(field => (
                                    <div key={field.key}>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            color: '#718096',
                                            marginBottom: '0.5rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            value={settings[field.key] || ''}
                                            onChange={(e) => updateSetting(field.key, e.target.value)}
                                            placeholder={`Enter value...`}
                                            style={{
                                                width: '100%',
                                                padding: '0.875rem 1rem',
                                                border: '2px solid #e2e8f0',
                                                borderRadius: '8px',
                                                fontSize: '0.95rem',
                                                color: '#2d3748',
                                                outline: 'none',
                                                transition: 'border-color 0.2s',
                                                boxSizing: 'border-box'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#778873'}
                                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Data Panel Component
function DataPanel({ title, description, data, onAdd, onEdit, onDelete, columns }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Filter data
    const filteredData = data.filter(item =>
        columns.some(col => {
            const val = item[col];
            if (!val) return false;
            return String(val).toLowerCase().includes(searchTerm.toLowerCase());
        })
    );

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '1.5rem 2rem',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>{title}</h2>
                    <p style={{ color: '#718096', fontSize: '0.9rem', marginTop: '0.25rem' }}>{description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} />
                        <input
                            type="text"
                            placeholder="Search records..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.75rem',
                                border: '2px solid #e2e8f0',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#778873'}
                            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                        />
                    </div>
                    <button
                        onClick={onAdd}
                        style={{
                            backgroundColor: '#778873',
                            color: 'white',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 6px rgba(119, 136, 115, 0.2)'
                        }}
                    >
                        <Plus size={18} /> Add New
                    </button>
                </div>
            </div>

            <div style={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                {columns.map(col => (
                                    <th key={col} style={{
                                        padding: '1rem 1.5rem',
                                        textAlign: 'left',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        color: '#4a5568',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {col.replace('_', ' ')}
                                    </th>
                                ))}
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: '700', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, index) => (
                                    <tr key={item.id || index} style={{ borderBottom: '1px solid #f1f5f9' }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                    >
                                        {columns.map(col => (
                                            <td key={col} style={{ padding: '1rem 1.5rem', color: '#2d3748', fontSize: '0.95rem', verticalAlign: 'middle' }}>
                                                {Array.isArray(item[col]) ? (
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                        {item[col].map((tag, i) => (
                                                            <span key={i} style={{
                                                                backgroundColor: '#edf2f7',
                                                                padding: '0.25rem 0.5rem',
                                                                borderRadius: '4px',
                                                                fontSize: '0.8rem',
                                                                color: '#4a5568'
                                                            }}>
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : col.includes('url') || col === 'image_url' ? (
                                                    item[col] ? <img src={item[col]} alt="preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} /> : <span style={{ color: '#cbd5e0' }}>—</span>
                                                ) : col === 'icon' ? (
                                                    <span style={{ fontSize: '1.5rem' }}>{item[col]}</span>
                                                ) : (
                                                    item[col]
                                                )}
                                            </td>
                                        ))}
                                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => onEdit(item)}
                                                    title="Edit"
                                                    style={{ padding: '6px', color: '#718096', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                                                    onMouseOver={(e) => { e.currentTarget.style.color = '#778873'; e.currentTarget.style.backgroundColor = '#f0fff4'; }}
                                                    onMouseOut={(e) => { e.currentTarget.style.color = '#718096'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(item.id)}
                                                    title="Delete"
                                                    style={{ padding: '6px', color: '#718096', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                                                    onMouseOver={(e) => { e.currentTarget.style.color = '#e53e3e'; e.currentTarget.style.backgroundColor = '#fff5f5'; }}
                                                    onMouseOut={(e) => { e.currentTarget.style.color = '#718096'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length + 1} style={{ padding: '3rem', textAlign: 'center', color: '#a0aec0' }}>
                                        No entries found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div style={{
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span style={{ fontSize: '0.85rem', color: '#718096' }}>
                        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length}
                    </span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            style={{
                                padding: '0.25rem 0.5rem',
                                border: '1px solid #cbd5e0',
                                borderRadius: '4px',
                                background: 'white',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                opacity: currentPage === 1 ? 0.5 : 1
                            }}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            style={{
                                padding: '0.25rem 0.5rem',
                                border: '1px solid #cbd5e0',
                                borderRadius: '4px',
                                background: 'white',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                opacity: currentPage === totalPages ? 0.5 : 1
                            }}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Edit Modal Component (Inline Styles)
function EditModal({ type, item, onSave, onClose, saving }) {
    const [formData, setFormData] = useState({});

    // Hooks and helper functions reused from original component...
    useEffect(() => {
        if (item) {
            setFormData({ ...item });
        } else {
            setFormData(getDefaultData(type));
        }
    }, [item, type]);

    const getDefaultData = (type) => {
        switch (type) {
            case 'services': return { icon: '🔑', title: '', description: '', features: [], image_url: '', active: 1 };
            case 'testimonials': return { name: '', designation: '', quote: '', image_url: '', rating: 5, active: 1 };
            case 'brands': return { name: '', description: '', logo_url: '', active: 1 };
            case 'areas': return { name: '', towns: [], active: 1 };
            case 'blog': return { title: '', excerpt: '', content: '', category: '', image_url: '', active: 1 };
            default: return {};
        }
    };

    const getFields = (type) => {
        switch (type) {
            case 'services': return [
                { key: 'icon', label: 'Icon (emoji)', type: 'text' },
                { key: 'title', label: 'Title', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'features', label: 'Features (comma-separated)', type: 'text' },
                { key: 'image_url', label: 'Service Image', type: 'image' },
            ];
            case 'testimonials': return [
                { key: 'name', label: 'Customer Name', type: 'text', required: true },
                { key: 'designation', label: 'Designation', type: 'text' },
                { key: 'quote', label: 'Quote', type: 'textarea', required: true },
                { key: 'image_url', label: 'Customer Photo', type: 'image' },
                { key: 'rating', label: 'Rating (1-5)', type: 'number' },
            ];
            case 'brands': return [
                { key: 'name', label: 'Brand Name', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'text' },
                { key: 'logo_url', label: 'Brand Logo', type: 'image' },
            ];
            case 'areas': return [
                { key: 'name', label: 'Area Name', type: 'text', required: true },
                { key: 'towns', label: 'Towns (comma-separated)', type: 'textarea' },
            ];
            case 'blog': return [
                { key: 'title', label: 'Title', type: 'text', required: true },
                { key: 'category', label: 'Category', type: 'text' },
                { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
                { key: 'content', label: 'Content', type: 'textarea' },
                { key: 'image_url', label: 'Featured Image', type: 'image' },
            ];
            default: return [];
        }
    };

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleImageUpload = (e, key) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File is too large. Please choose an image under 2MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChange(key, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let processedData = { ...formData };
        if (type === 'services' && typeof processedData.features === 'string') {
            processedData.features = processedData.features.split(',').map(f => f.trim()).filter(f => f);
        }
        if (type === 'areas' && typeof processedData.towns === 'string') {
            processedData.towns = processedData.towns.split(',').map(t => t.trim()).filter(t => t);
        }
        onSave(processedData);
    };

    const getInputValue = (key) => {
        const value = formData[key];
        if (Array.isArray(value)) return value.join(', ');
        return value || '';
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
        }}>
            <div style={{
                backgroundColor: 'white',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
                <div style={{
                    padding: '1.25rem 2rem',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#f8fafc',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px'
                }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1a202c' }}>
                        {item ? `Edit ${type.slice(0, -1)}` : `Add New ${type.slice(0, -1)}`}
                    </h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: '#a0aec0', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {getFields(type).map(field => (
                            <div key={field.key}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    color: '#4a5568',
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    {field.label} {field.required && <span style={{ color: '#e53e3e' }}>*</span>}
                                </label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        value={getInputValue(field.key)}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                        required={field.required}
                                        rows={4}
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '0.95rem',
                                            color: '#2d3748',
                                            outline: 'none',
                                            resize: 'vertical',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#778873'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                ) : field.type === 'image' ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {formData[field.key] && (
                                            <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                                <img src={formData[field.key]} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <label style={{
                                                padding: '0.75rem 1rem',
                                                border: '2px dashed #cbd5e0',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                                width: '100%',
                                                fontSize: '0.9rem',
                                                color: '#4a5568',
                                                fontWeight: '500',
                                                backgroundColor: '#f8fafc'
                                            }}>
                                                Upload Image
                                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, field.key)} style={{ display: 'none' }} />
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <input
                                        type={field.type}
                                        value={getInputValue(field.key)}
                                        onChange={(e) => handleChange(field.key, e.target.type === 'number' ? parseInt(e.target.value) : e.target.value)}
                                        required={field.required}
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '0.95rem',
                                            color: '#2d3748',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#778873'}
                                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
                        <button type="button" onClick={onClose} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid #cbd5e0', backgroundColor: 'white', color: '#4a5568', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" disabled={saving} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#778873', color: 'white', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer' }}>{saving ? 'Saving...' : 'Save Record'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
