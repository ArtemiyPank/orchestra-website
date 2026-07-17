import AlumniClient from "./AlumniClient"

export const metadata = {
  title: "Alumni | Atid Raziel Orchestra",
  description: "Celebrating the success of former members of the Atid Raziel School Orchestra.",
}

const AlumniPage = () => {
  return (
    <div className="p-8">
      <AlumniClient />
    </div>
  )
}

export default AlumniPage

