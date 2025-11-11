import Link from "next/link";
import CourtCard from "./CourtCard";
import { CourtJson } from "../../interfaces";

interface Props {
  courts: Promise<CourtJson>;
}

export default async function CourtCatalog({ courts }: Props) {
    const json = await courts;
    const court = json.data;

    return (
        <div className="flex flex-wrap justify-center gap-6 p-5">
        {court.map((c) => (
            <Link key={c.id} href={`/court/${c.id}`} style={{ textDecoration: "none" }}>
            <CourtCard 
                name={c.name} 
                id={c.id} 
                location={c.location} 
                type={c.type} 
                capacity={c.capacity} 
                available={c.available} 
                pricePerHour={c.pricePerHour}/>
            </Link>
        ))}
        </div>
    );
}
