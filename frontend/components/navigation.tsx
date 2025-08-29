  "use client"

  import Link from "next/link"
  import { usePathname } from "next/navigation"
  import { Button } from "@/components/ui/button"
  import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
  import { Badge } from "@/components/ui/badge"
import { Menu, Moon, Sun, LogOut, User, Heart } from "lucide-react"
  import { useTheme } from "next-themes"
  import { useAuth } from "@/contexts/auth-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { cn } from "@/lib/utils"

  const publicNavigation = [
    { name: "Home", href: "/" },
  ]

  const protectedNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Courses", href: "/courses" },
  { name: "Tools", href: "/tools" },
  { name: "Cybersecurity", href: "/cybersecurity" },
  // { name: "Search", href: "/search" },
  { name: "Leaderboard", href: "/leaderboard" },
  { name: "Wishlist", href: "/wishlist" },
]

  export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user, signOut } = useAuth()
  const { wishlistCount } = useWishlist()

    const navigation = user ? protectedNavigation : publicNavigation

    const handleSignOut = async () => {
      try {
        await signOut()
      } catch (error) {
        console.error("Sign out failed:", error)
      }
    }

    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-xl">AIverse Hub</span>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Beta
              </Badge>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Button key={item.name} variant={pathname === item.href ? "default" : "ghost"} size="sm" asChild>
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Wishlist Icon */}
              {user && (
                <Button variant="ghost" size="sm" asChild className="relative">
                  <Link href="/wishlist">
                    <Heart className="h-4 w-4" />
                    {wishlistCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                      >
                        {wishlistCount > 9 ? '9+' : wishlistCount}
                      </Badge>
                    )}
                  </Link>
                </Button>
              )}

              {/* Theme Toggle */}
              <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  <span className="sr-only">Toggle theme</span>
</Button>


              {/* Auth Buttons */}
              {user ? (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      {user.name}
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-primary",
                          pathname === item.href ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                    
                    {/* Mobile Auth Buttons */}
                    {user ? (
                      <>
                        <Link
                          href="/wishlist"
                          className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                        >
                          <Heart className="h-4 w-4 mr-2 inline" />
                          Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                        </Link>
                        <Link
                          href="/profile"
                          className="text-sm font-medium transition-colors hover:text-primary text-primary"
                        >
                          <User className="h-4 w-4 mr-2 inline" />
                          {user.name}
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground text-left"
                        >
                          <LogOut className="h-4 w-4 mr-2 inline" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/auth/signin"
                          className="text-sm font-medium transition-colors hover:text-primary text-primary"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/auth/signup"
                          className="text-sm font-medium transition-colors hover:text-primary text-primary"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    )
  }
