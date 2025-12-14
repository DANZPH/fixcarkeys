import Link from 'next/link';

const posts = {
  'what-to-do-when-you-lose-car-keys': {
    title: 'What to Do When You Lose Your Car Keys',
    date: 'December 10, 2024',
    category: 'Tips',
    content: `
      <p>Losing your car keys can be stressful, but don't panic. Here's what you should do:</p>
      <h3>1. Stay Calm and Search Thoroughly</h3>
      <p>Before assuming your keys are lost, do a thorough search of common places: pockets, bags, under furniture, and recent locations you've visited.</p>
      <h3>2. Check for a Spare Key</h3>
      <p>If you have a spare key at home or with a trusted friend or family member, this is the quickest solution.</p>
      <h3>3. Contact a Professional Locksmith</h3>
      <p>A professional automotive locksmith can create a new key for your vehicle, often at a fraction of the dealership cost.</p>
      <h3>4. Consider Your Options</h3>
      <p>Depending on your vehicle type, you may need key cutting, transponder programming, or smart key replacement.</p>
      <h3>5. Prevent Future Losses</h3>
      <p>Consider getting a spare key made and keeping it in a safe place. Key trackers can also help locate lost keys.</p>
    `
  },
  'transponder-keys-explained': {
    title: 'Transponder Keys Explained: How They Work',
    date: 'December 5, 2024',
    category: 'Education',
    content: `
      <p>Transponder keys have become standard in modern vehicles. Here's how they work:</p>
      <h3>What is a Transponder Key?</h3>
      <p>A transponder key contains a small electronic chip that communicates with your vehicle's immobilizer system.</p>
      <h3>How Does It Work?</h3>
      <p>When you insert the key, the car sends a signal to the chip. The chip responds with a unique code. If the code matches, the car starts.</p>
      <h3>Benefits of Transponder Keys</h3>
      <p>They provide an extra layer of security, making it much harder for thieves to hot-wire your vehicle.</p>
      <h3>Programming Requirements</h3>
      <p>Transponder keys must be programmed to your specific vehicle. This requires specialized equipment.</p>
    `
  }
};

export default function BlogPost({ params }) {
  const post = posts[params.slug] || {
    title: 'Blog Post',
    date: 'December 2024',
    category: 'General',
    content: '<p>This blog post content is coming soon. Check back later for more information!</p>'
  };

  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, #778873 0%, #A1BC98 100%)',
        padding: '60px 0',
        color: 'white'
      }}>
        <div className="container">
          <Link href="/blog" style={{ color: '#D2DCB6', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
            ← Back to Blog
          </Link>
          <span style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            display: 'inline-block',
            marginLeft: '1rem'
          }}>{post.category}</span>
          <h1 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '0.5rem' }}>{post.title}</h1>
          <p style={{ opacity: 0.9 }}>{post.date}</p>
        </div>
      </section>

      <section style={{ padding: '60px 0', backgroundColor: '#F1F3E0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <article style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            lineHeight: 1.8
          }}>
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{ color: '#444' }}
            />
          </article>
        </div>
      </section>
    </>
  );
}
