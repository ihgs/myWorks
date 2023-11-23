import { Box, Button, Stack, TextField } from "@mui/material"
import WorkCard from '@/app/components/WorkCard';
import { useEffect, useState } from "react";

export default function WorkCards ({works, year, month, day}:{works:Work[], year: number,month:number, day:number}) {

    const [data,setData] = useState<Work[]>(works)

    const add = ()=>{
        const newWork = {year,month,day, version:0,id:1}
        setData(data.concat([newWork]))
    }

    return (
        <>
            {data.map(datum=>{
                return <WorkCard key={datum.start} work={datum} edit={datum.start===undefined} />
            })}
            <Button size="large" variant="contained" onClick={add} sx={{margin:1}}>+</Button>
        </>
    )
}