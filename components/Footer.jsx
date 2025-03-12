export default function Footer() {
  return (
    <footer className="relative py-8 px-4 border-t border-gray-800 bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
              HACK
            </span>
            <span className="text-3xl font-bold text-amber-500">∞</span>
          </div>
        </div>
        <p className="text-gray-500 mb-4">© {new Date().getFullYear()} Hack Infinity. All rights reserved.</p>
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          <a href="#" className="hover:text-red-500 transition-colors duration-300">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:text-red-500 transition-colors duration-300">
            Terms of Service
          </a>
          <span>|</span>
          <a href="#" className="hover:text-red-500 transition-colors duration-300">
            Code of Conduct
          </a>
        </div>
        <p className="text-xs text-gray-700 mt-4 font-mono">"To infinity and beyond."</p>
      </div>
    </footer>
  )
}

