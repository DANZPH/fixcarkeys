import { createClient } from '@libsql/client';

let db = null;

export function getDb() {
    if (!db) {
        db = createClient({
            url: process.env.TURSO_DATABASE_URL || 'libsql://fixcarkeys-danzph.aws-eu-west-1.turso.io',
            authToken: process.env.TURSO_AUTH_TOKEN,
        });
    }
    return db;
}

// Initialize database schema
export async function initializeDatabase() {
    const db = getDb();

    // Settings table for site configuration
    await db.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Services table
    await db.execute(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT,
      title TEXT NOT NULL,
      description TEXT,
      features TEXT,
      image_url TEXT,
      sort_order INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Testimonials table
    await db.execute(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      designation TEXT,
      quote TEXT NOT NULL,
      image_url TEXT,
      rating INTEGER DEFAULT 5,
      active INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Car brands table
    await db.execute(`
    CREATE TABLE IF NOT EXISTS brands (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      logo_url TEXT,
      active INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Areas table
    await db.execute(`
    CREATE TABLE IF NOT EXISTS areas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      towns TEXT,
      active INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Blog posts table
    await db.execute(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT,
      category TEXT,
      image_url TEXT,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Media/uploads table
    await db.execute(`
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      url TEXT NOT NULL,
      type TEXT,
      size INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    console.log('Database initialized successfully');
    return true;
}

// Seed default data
export async function seedDefaultData() {
    const db = getDb();

    // Check if data exists
    const settingsResult = await db.execute('SELECT COUNT(*) as count FROM settings');
    if (settingsResult.rows[0].count > 0) {
        console.log('Data already seeded');
        return;
    }

    // Default settings
    const defaultSettings = [
        { key: 'site_name', value: 'FixCarKeys' },
        { key: 'site_tagline', value: 'MOBILE AUTO LOCKSMITH' },
        { key: 'site_description', value: 'Lost your car keys? Need a spare? We provide fast, reliable car key cutting, programming, and replacement services for all vehicle makes and models.' },
        { key: 'phone_number', value: '07444 125447' },
        { key: 'whatsapp_number', value: '447444125447' },
        { key: 'email', value: 'info@fixcarkeys.co.uk' },
        { key: 'address', value: 'North West England, UK' },
        { key: 'hours', value: 'Mon-Sun: 24/7' },
        { key: 'facebook_url', value: 'https://www.facebook.com/profile.php?id=61557261796916' },
        { key: 'instagram_url', value: 'https://www.instagram.com/fixcarkeys' },
        { key: 'tiktok_url', value: 'https://tiktok.com/@FixCarKeys' },
        { key: 'hero_stat_1_value', value: '24/7' },
        { key: 'hero_stat_1_label', value: 'Emergency Service' },
        { key: 'hero_stat_2_value', value: '15+' },
        { key: 'hero_stat_2_label', value: 'Years Experience' },
        { key: 'hero_stat_3_value', value: '100%' },
        { key: 'hero_stat_3_label', value: 'Satisfaction' },
        { key: 'logo_url', value: '' },
        { key: 'hero_video_url', value: '/assets/Car_Moving_Video.mp4' },
    ];

    for (const setting of defaultSettings) {
        await db.execute({
            sql: 'INSERT INTO settings (key, value) VALUES (?, ?)',
            args: [setting.key, setting.value]
        });
    }

    // Default services
    const defaultServices = [
        { icon: '🔑', title: 'Key Cutting', description: 'Precision key cutting for all vehicle types including standard, laser-cut, and high-security keys.', features: JSON.stringify(['All key types', 'On-site service', 'Same-day completion']) },
        { icon: '💻', title: 'Key Programming', description: 'Expert transponder and smart key programming for modern vehicles with advanced security.', features: JSON.stringify(['Transponder keys', 'Smart keys', 'Remote fobs']) },
        { icon: '🔄', title: 'Key Replacement', description: "Complete key replacement solutions when you've lost all your keys or need extras.", features: JSON.stringify(['All makes & models', 'OEM quality', 'Warranty included']) },
        { icon: '🚗', title: 'Emergency Lockout', description: '24/7 emergency lockout assistance to get you back on the road quickly and safely.', features: JSON.stringify(['24/7 availability', 'Fast response', 'No damage entry']) },
        { icon: '🔧', title: 'Ignition Repair', description: 'Professional ignition cylinder repair and replacement services for all vehicles.', features: JSON.stringify(['Diagnosis', 'Repair', 'Full replacement']) },
        { icon: '📱', title: 'Remote Key Fob', description: 'Remote key fob programming, repair, and battery replacement services.', features: JSON.stringify(['Programming', 'Battery swap', 'Shell replacement']) },
    ];

    for (let i = 0; i < defaultServices.length; i++) {
        const s = defaultServices[i];
        await db.execute({
            sql: 'INSERT INTO services (icon, title, description, features, sort_order) VALUES (?, ?, ?, ?, ?)',
            args: [s.icon, s.title, s.description, s.features, i]
        });
    }

    // Default testimonials
    const defaultTestimonials = [
        { name: 'Nicholas Watkins', designation: 'VW Owner', quote: "Absolutely spot on. Needed a spare key for my VW, got a very competitive quote, arrived first thing the next morning. Less than half an hour and all done. Key looks and works superb. Quick, great price & polite. Couldn't ask for more.", image_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop' },
        { name: 'Mathew Tait', designation: 'Van Owner', quote: "Couldn't have rang a better locksmith. Narcis answered the phone call straight away and arrived within the hour. He had great communication and knowledge and had my van unlocked within 30 minutes. Very nice and friendly guy, highly, highly recommend. Also very fair with his prices.", image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop' },
        { name: 'Karen Berrey', designation: 'Verified Customer', quote: "Car battery was dead and the manual lock wouldn't work. He came out within 2 hours and fixed it now problem. Even gave advise to stop it from happening again. Reasonably priced too, especially for a Sunday morning. Absolutely brilliant, thank you so much for you help. Couldn't recommend enough.", image_url: 'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop' },
        { name: 'Harry Ade', designation: 'Ford Owner', quote: "He is very honest and sincere. I called him for my faulty Ford S-Max car key fob. He came at the given ETA. Fix the issue promptly. I will be happy to recommend him to anyone who needs his services.", image_url: 'https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop' },
        { name: 'Ian The Monk', designation: 'Local Guide', quote: "Had a car key broken which I couldn't repair after battery replacement. Messaged company arrived at my home 30 mins later and repaired key. Happy with service and price. Recommended", image_url: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop' },
    ];

    for (let i = 0; i < defaultTestimonials.length; i++) {
        const t = defaultTestimonials[i];
        await db.execute({
            sql: 'INSERT INTO testimonials (name, designation, quote, image_url, sort_order) VALUES (?, ?, ?, ?, ?)',
            args: [t.name, t.designation, t.quote, t.image_url, i]
        });
    }

    // Default car brands
    const defaultBrands = [
        { name: 'BMW', description: 'Comfort access & digital keys', logo_url: 'https://cdn.simpleicons.org/bmw' },
        { name: 'Mercedes-Benz', description: 'Smart keys & keyless go', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
        { name: 'Audi', description: 'Advanced key systems', logo_url: 'https://cdn.simpleicons.org/audi' },
        { name: 'Volkswagen', description: 'Transponder & remote keys', logo_url: 'https://cdn.simpleicons.org/volkswagen' },
        { name: 'Toyota', description: 'Smart keys & remotes', logo_url: 'https://cdn.simpleicons.org/toyota' },
        { name: 'Honda', description: 'Key fobs & smart entry', logo_url: 'https://cdn.simpleicons.org/honda' },
        { name: 'Ford', description: 'Intelligent access keys', logo_url: 'https://cdn.simpleicons.org/ford' },
        { name: 'Nissan', description: 'Intelligent keys', logo_url: 'https://cdn.simpleicons.org/nissan' },
        { name: 'Land Rover', description: 'Active key & remotes', logo_url: 'https://upload.wikimedia.org/wikipedia/en/b/b5/Land_Rover_logo.svg' },
        { name: 'Jaguar', description: 'Smart key solutions', logo_url: 'https://cdn.simpleicons.org/jaguar' },
        { name: 'Vauxhall', description: 'Remote & flip keys', logo_url: 'https://cdn.simpleicons.org/vauxhall' },
        { name: 'Volvo', description: 'Smart entry programming', logo_url: 'https://cdn.simpleicons.org/volvo' },
        { name: 'Peugeot', description: 'Electronic key fobs', logo_url: 'https://cdn.simpleicons.org/peugeot' },
        { name: 'Renault', description: 'Hands-free key cards', logo_url: 'https://cdn.simpleicons.org/renault' },
        { name: 'Hyundai', description: 'Smart keys & proximity', logo_url: 'https://cdn.simpleicons.org/hyundai' },
        { name: 'Kia', description: 'Smart key programming', logo_url: 'https://cdn.simpleicons.org/kia' },
        { name: 'Lexus', description: 'Smart access keys', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Lexus_division_emblem.svg' },
        { name: 'Mazda', description: 'Advanced keyless entry', logo_url: 'https://cdn.simpleicons.org/mazda' },
    ];

    for (let i = 0; i < defaultBrands.length; i++) {
        const b = defaultBrands[i];
        await db.execute({
            sql: 'INSERT INTO brands (name, description, logo_url, sort_order) VALUES (?, ?, ?, ?)',
            args: [b.name, b.description, b.logo_url, i]
        });
    }

    // Default areas
    const defaultAreas = [
        { name: 'Wigan', towns: JSON.stringify(['Wigan Town Centre', 'Ashton-in-Makerfield', 'Leigh', 'Standish', 'Hindley']) },
        { name: 'Warrington', towns: JSON.stringify(['Warrington Town Centre', 'Lymm', 'Culcheth', 'Birchwood', 'Padgate']) },
        { name: 'Bolton', towns: JSON.stringify(['Bolton Town Centre', 'Horwich', 'Farnworth', 'Westhoughton', 'Bromley Cross']) },
        { name: 'Liverpool', towns: JSON.stringify(['Liverpool City Centre', 'Anfield', 'Wavertree', 'Woolton', 'Crosby']) },
        { name: 'Manchester', towns: JSON.stringify(['Manchester City Centre', 'Salford', 'Trafford', 'Didsbury', 'Chorlton']) },
        { name: 'Stoke-on-Trent', towns: JSON.stringify(['Hanley', 'Stoke', 'Burslem', 'Tunstall', 'Longton']) },
        { name: 'Chester & Ellesmere Port', towns: JSON.stringify(['Chester City Centre', 'Ellesmere Port', 'Neston', 'Hoole', 'Blacon']) },
        { name: 'Southport & Chorley', towns: JSON.stringify(['Southport Town Centre', 'Chorley', 'Formby', 'Ormskirk', 'Leyland']) },
        { name: 'Skelmersdale & Ormskirk', towns: JSON.stringify(['Skelmersdale', 'Ormskirk', 'Burscough', 'Aughton', 'Rainford']) },
    ];

    for (let i = 0; i < defaultAreas.length; i++) {
        const a = defaultAreas[i];
        await db.execute({
            sql: 'INSERT INTO areas (name, towns, sort_order) VALUES (?, ?, ?)',
            args: [a.name, a.towns, i]
        });
    }

    // Default blog posts
    const defaultPosts = [
        { title: "LOCKED KEYS IN CAR? HERE'S WHAT YOU NEED TO DO", excerpt: "Locked Keys in Car? Here's What to Do Next Getting locked out of your car is frustrating, but it happens...", category: 'Locksmith in UK' },
        { title: "IGNITION BARREL PROBLEMS? HERE'S EVERYTHING YOU NEED TO KNOW", excerpt: "Ignition Barrel Problems? Here's Everything You Need to Know Why Won't My Car Key Turn In the Ignition? Causes &...", category: 'Uncategorized' },
        { title: "SMART CAR KEYS: EVERYTHING YOU NEED TO KNOW", excerpt: "Smart Car Keys: Everything You Need to Know What Are Smart Car Keys and How Do They Work?Smart car keys,...", category: 'Uncategorized' },
        { title: "SPARE CAR KEYS", excerpt: "Spare Car Keys: How FixCarKeys Can Help You Save Time and Money When it comes to car ownership, having a...", category: 'Locksmith in UK' },
        { title: "TIME IS MONEY: HOW FIXCARKEYS SAVES YOU BOTH TIME AND MONEY", excerpt: "Time Is Money: How FixCarKeys Saves You Both Time and Money Time Is Money: How FixCarKeys Saves You Both Time...", category: 'Locksmith in UK' },
    ];

    for (const p of defaultPosts) {
        await db.execute({
            sql: 'INSERT INTO blog_posts (title, excerpt, category) VALUES (?, ?, ?)',
            args: [p.title, p.excerpt, p.category]
        });
    }

    console.log('Default data seeded successfully');
}
