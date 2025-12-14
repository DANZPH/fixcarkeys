import Link from 'next/link';

const posts = [
  {
    slug: 'what-to-do-when-you-lose-car-keys',
    title: 'What to Do When You Lose Your Car Keys',
    excerpt: 'Lost your car keys? Don\'t panic. Here\'s a step-by-step guide on what to do next.',
    date: 'December 10, 2024',
    category: 'Tips'
  },
  {
    slug: 'transponder-keys-explained',
    title: 'Transponder Keys Explained: How They Work',
    excerpt: 'Learn about transponder keys, how they work, and why they\'re important for your vehicle\'s security.',
    date: 'December 5, 2024',
    category: 'Education'
  },
  {
    slug: 'smart-key-vs-traditional-key',
    title: 'Smart Key vs Traditional Key: Which is Better?',
    excerpt: 'Comparing smart keys and traditional keys to help you understand the pros and cons of each.',
    date: 'November 28, 2024',
    category: 'Comparison'
  },
  {
    slug: 'car-key-battery-replacement',
    title: 'How to Replace Your Car Key Battery',
    excerpt: 'A simple guide to replacing the battery in your car key fob.',
    date: 'November 20, 2024',
    category: 'DIY'
  },
  {
    slug: 'signs-you-need-new-car-key',
    title: '5 Signs You Need a New Car Key',
    excerpt: 'Is your car key on its last legs? Here are the warning signs to watch for.',
    date: 'November 15, 2024',
    category: 'Tips'
  },
  {
    slug: 'car-lockout-prevention-tips',
    title: 'Car Lockout Prevention Tips',
    excerpt: 'Simple tips to avoid getting locked out of your car.',
    date: 'November 10, 2024',
    category: 'Tips'
  },
];

export default function BlogPage() {
  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, #778873 0%, #A1BC98 100%)',
        padding: '60px 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Blog</h1>
          <p style={{ opacity: 0.95, maxWidth: '600px', margin: '0 auto' }}>
            Tips, guides, and news about car keys and automotive locksmith services
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {posts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  height: '100%'
                }}>
                  <div style={{
                    backgroundColor: '#A1BC98',
                    height: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem'
                  }}>🔑</div>
                  <div style={{ padding: '1.5rem' }}>
                    <span style={{
                      backgroundColor: '#D2DCB6',
                      color: '#778873',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>{post.category}</span>
                    <h2 style={{
                      color: '#778873',
                      fontSize: '1.25rem',
                      marginTop: '0.75rem',
                      marginBottom: '0.5rem'
                    }}>{post.title}</h2>
                    <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1rem' }}>{post.excerpt}</p>
                    <span style={{ color: '#999', fontSize: '0.85rem' }}>{post.date}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
