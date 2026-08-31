import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import BirdSpeciesPage from './pages/BirdSpeciesPage'
import SpeciesOverviewPage from './pages/SpeciesOverviewPage'
import MigrationResourcePage from './pages/MigrationResourcePage'
import MonitoringResourcePage from './pages/MonitoringResourcePage'
import ConservationEndangeredPage from './pages/ConservationEndangeredPage'
import ConservationWildlifeActionPlanPage from './pages/ConservationWildlifeActionPlanPage'
import ExtinctBirdsPage from './pages/ExtinctBirdsPage'
import ExtinctSpeciesOverviewPage from './pages/ExtinctSpeciesOverviewPage'
import ConservationIssuesPage from './pages/ConservationIssuesPage'
import BirdOrganizationsPage from './pages/BirdOrganizationsPage'
import DataExplorerPage from './pages/DataExplorerPage'
import EducatorResourcesPage from './pages/EducatorResourcesPage'
import BirdingHotspotsPage from './pages/BirdingHotspotsPage'
import VolunteerOpportunitiesPage from './pages/VolunteerOpportunitiesPage'
import HelpingBirdsPage from './pages/HelpingBirdsPage'
import BirdLabPeoplePage from './pages/BirdLabPeoplePage'
import BirdLabHistoryPage from './pages/BirdLabHistoryPage'
import BirdLabResearchPage from './pages/BirdLabResearchPage'
import BirdLabResourcesPage from './pages/BirdLabResourcesPage'

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
          <Route path="/"              element={<HomePage />} />
          <Route path="/bird-species"              element={<BirdSpeciesPage />} />
          <Route path="/bird-species/:slug"        element={<SpeciesOverviewPage />} />
          <Route path="/migration/:slug"      element={<MigrationResourcePage />} />
          <Route path="/monitoring/:slug"     element={<MonitoringResourcePage />} />
          <Route path="/conservation/endangered-species"      element={<ConservationEndangeredPage />} />
          <Route path="/conservation/wildlife-action-plan"    element={<ConservationWildlifeActionPlanPage />} />
          <Route path="/conservation/extinct-birds"           element={<ExtinctBirdsPage />} />
          <Route path="/conservation/extinct-birds/:slug"     element={<ExtinctSpeciesOverviewPage />} />
          <Route path="/conservation/major-issues"            element={<ConservationIssuesPage />} />
          <Route path="/conservation/organizations"           element={<BirdOrganizationsPage />} />
          <Route path="/data-explorer" element={<DataExplorerPage />} />
          <Route path="/education/educator-resources"                 element={<EducatorResourcesPage />} />
          <Route path="/education/birding-hotspots"                   element={<BirdingHotspotsPage />} />
          <Route path="/education/volunteer-opportunities"            element={<VolunteerOpportunitiesPage />} />
          <Route path="/education/helping-birds-from-home"            element={<HelpingBirdsPage />} />
          <Route path="/birdlab/people"                 element={<BirdLabPeoplePage />} />
          <Route path="/birdlab/history"                element={<BirdLabHistoryPage />} />
          <Route path="/birdlab/current-research"       element={<BirdLabResearchPage />} />
          <Route path="/birdlab/resources"              element={<BirdLabResourcesPage />} />
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
