import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Eager: homepage (most common entry point)
import Index from "./pages/Index";

// Lazy: all other pages
const Services = lazy(() => import("./pages/Services"));
const ServiceMarketing = lazy(() => import("./pages/ServiceMarketing"));
const ServiceOperations = lazy(() => import("./pages/ServiceOperations"));
const ServiceTechnology = lazy(() => import("./pages/ServiceTechnology"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminPostEditor = lazy(() => import("./pages/AdminPostEditor"));
const ForCertificationOrgs = lazy(() => import("./pages/ForCertificationOrgs"));
const ForNewCertification = lazy(() => import("./pages/ForNewCertification"));
const ForServiceProviders = lazy(() => import("./pages/ForServiceProviders"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-cream" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/marketing" element={<ServiceMarketing />} />
              <Route path="/services/operations" element={<ServiceOperations />} />
              <Route path="/services/technology" element={<ServiceTechnology />} />
              <Route path="/for/certification-orgs" element={<ForCertificationOrgs />} />
              <Route path="/for/new-certification" element={<ForNewCertification />} />
              <Route path="/for/service-providers" element={<ForServiceProviders />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/posts/:id" element={<AdminPostEditor />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
