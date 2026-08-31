import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import BirdSpeciesPage from './pages/BirdSpeciesPage'
import SpeciesDetailPage from './pages/SpeciesDetailPage'
import ContentPage from './pages/ContentPage'
import ExtinctBirdsPage from './pages/ExtinctBirdsPage'
import ExtinctSpeciesOverviewPage from './pages/ExtinctSpeciesOverviewPage'
import DataExplorerPage from './pages/DataExplorerPage'

function AppLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/bird-species"                 element={<BirdSpeciesPage />} />
          <Route path="/bird-species/:slug"           element={<SpeciesDetailPage tab="overview" />} />
          <Route path="/bird-species/:slug/phenology" element={<SpeciesDetailPage tab="phenology" />} />
          <Route path="/bird-species/:slug/trends"    element={<SpeciesDetailPage tab="trends" />} />

          {/* Written-content sections — one Markdown file per page in written_content/<section>/ */}
          <Route path="/migration/:slug"   element={<ContentPage section="migration"   sectionLabel="Migration" />} />
          <Route path="/monitoring/:slug"  element={<ContentPage section="monitoring"  sectionLabel="Monitoring Programs" />} />
          <Route path="/education/:slug"   element={<ContentPage section="education"    sectionLabel="Education" />} />
          <Route path="/birdlab/:slug"     element={<ContentPage section="birdlab"      sectionLabel="Illinois BirdLab" />} />

          {/* Conservation: extinct birds keeps its own data-driven index; the rest are Markdown */}
          <Route path="/conservation/extinct-birds"       element={<ExtinctBirdsPage />} />
          <Route path="/conservation/extinct-birds/:slug" element={<ExtinctSpeciesOverviewPage />} />
          <Route path="/conservation/:slug"              element={<ContentPage section="conservation" sectionLabel="Conservation" />} />

          <Route path="/data-explorer" element={<DataExplorerPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
