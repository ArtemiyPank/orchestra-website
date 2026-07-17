import PerformancesClient from "./PerformancesClient"

export const metadata = {
  title: "Performances | Atid Raziel Orchestra",
  description: "Concerts and performances of the Atid Raziel School Orchestra with photos and programs.",
}

const PerformancesPage = () => {
  return (
    <div className="p-0 pd:p-8">
      <PerformancesClient />
    </div>
  )
}

export default PerformancesPage

