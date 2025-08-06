import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Adventure Blog - Toronto Outdoor Escape Room Insights | ARK",
  description: "Discover the best outdoor escape room experiences, Toronto adventure guides, and tips for young professionals. Expert insights on outdoor activities and mystery adventures.",
  keywords: [
    "outdoor escape room blog", "Toronto adventure guide", "escape room tips", "young professionals activities",
    "outdoor activities Toronto", "adventure blog", "mystery games", "board game experiences"
  ],
  openGraph: {
    title: "Adventure Blog - Toronto Outdoor Escape Room Insights | ARK",
    description: "Expert insights on outdoor escape rooms and adventure experiences in Toronto",
    type: "website",
  },
}

// Blog posts data - this could be moved to a CMS or separate data file
const blogPosts = [
  {
    id: 'outdoor-escape-rooms-toronto',
    title: 'Ultimate Guide to Outdoor Escape Rooms in Toronto',
    excerpt: 'Discover why Toronto is the perfect city for unforgettable outdoor escape room adventures. Perfect for young professionals, escape room enthusiasts, and board game lovers.',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Guide',
    image: '/gallery/ar-clue-example-thumb.jpg',
    slug: 'outdoor-escape-rooms-toronto'
  },
  // Add more blog posts here as you create them
]

export default function BlogIndexPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          Adventure Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Expert insights on outdoor escape rooms, Toronto adventures, and creating unforgettable experiences for young professionals and escape room enthusiasts.
        </p>
      </header>

      {/* Featured Post */}
      {blogPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <span className="mr-3">⭐</span>
            Featured Article
          </h2>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {blogPosts[0].category}
                  </span>
                  <span className="text-gray-500 text-sm">{blogPosts[0].date}</span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-gray-500 text-sm">{blogPosts[0].readTime}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                  {blogPosts[0].title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <Link 
                  href={`/blog/${blogPosts[0].slug}`}
                  className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  Read Full Article
                  <span className="ml-2">→</span>
                </Link>
              </div>
              <div className="relative">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  width={400}
                  height={250}
                  className="rounded-xl shadow-lg object-cover w-full h-64"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                  Latest
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <span className="mr-3">📚</span>
          All Articles
        </h2>
        
        {blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">More Adventures Coming Soon!</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're working on exciting new content about outdoor escape rooms, Toronto adventures, and tips for escape room enthusiasts.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:transform hover:scale-105"
              >
                <div className="relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-200"
                  >
                    Read More
                    <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Signup Section */}
      <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          🚀 Stay Updated on Toronto Adventures
        </h2>
        <p className="text-blue-100 mb-6 text-lg max-w-2xl mx-auto">
          Get the latest tips on outdoor escape rooms, Toronto adventure guides, and exclusive updates on new ARK experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-white placeholder-gray-200 outline-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Subscribe
          </button>
        </div>
        <p className="text-blue-200 text-sm mt-3">
          Join other adventure enthusiasts and escape room lovers in Toronto!
        </p>
      </section>

      {/* Back to Home CTA */}
      <section className="mt-16 text-center">
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Ready for Your Own Adventure?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Experience Toronto's ultimate outdoor escape room adventure with ARK. Perfect for young professionals and escape room enthusiasts!
          </p>
          <Link 
            href="/"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105"
          >
            🏠 Back to Home & Book Adventure
          </Link>
        </div>
      </section>
    </main>
  )
}