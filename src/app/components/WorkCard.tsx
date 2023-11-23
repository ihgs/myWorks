import { Box, Button, Stack, TextField } from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import { InjectionMode, asClass, createContainer } from "awilix";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Recorder } from "../interfaces";
import { ContainerContext } from "../base";



function EditForm ({work, clickSave}: {work: Work, clickSave: any }) {
    const container = useContext(ContainerContext)
    let recorder:any;
    if(container){
        recorder = container.resolve<Recorder>("recorder")
    }
    const {
        control,
        handleSubmit,
    } = useForm<Work>({
        defaultValues: {
            ...work
        }
    })

    const validationRules = {
        time: {
            required: '時間を入力してください'
        },
        item: {
            required: '項目を入力してください'
        }
    }

    const onSubmit: SubmitHandler<Work> = (data: Work) => {
        clickSave(recorder.save(data))
    }

    return (
        <Stack component="form" spacing={1.5} onSubmit={handleSubmit(onSubmit)}>
            <Box>
            <Controller
                name="start"
                control={control}
                rules={validationRules.time}
                
                render={({field, fieldState}: {field: any, fieldState: any})=>(
                    <TextField
                        {...field}
                        sx={{mr:1}}
                        type="text"
                        label="start"
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        variant="standard"
                    />
                )}
            />
            <Controller
                name="end"
                control={control}
                rules={validationRules.time}
                render={({field, fieldState}: {field: any, fieldState: any})=>(
                    <TextField
                        {...field}
                        sx={{mr:1}}
                        type="text"
                        label="end"
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        variant="standard"
                    />
                )}
            />
            <Controller
                name="item"
                control={control}
                rules={validationRules.item}
                render={({field, fieldState}: {field: any, fieldState: any})=>(
                    <TextField
                        {...field}
                        sx={{mr:1}}
                        type="item"
                        label="item"
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        variant="standard"
                    />
                )}
            />
            <Controller
                name="type"
                control={control}
                render={({field, fieldState}: {field: any, fieldState: any})=>(
                    <TextField
                        {...field}
                        sx={{mr:1}}
                        type="type"
                        label="type"
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        variant="standard"
                    />
                )}
            />
            </Box>
            <Controller
                name="comment"
                control={control}
                render={({field, fieldState}: {field: any, fieldState: any})=>(
                    <TextField
                        {...field}
                        type="text"
                        label="comment"
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        multiline
                        minRows={3}
                    />
                )}
            />
            <Button type="submit" variant="contained" name="save">Save</Button>
        </Stack>
    )
}

function Display ({work, clickEdit}: {work: Work, clickEdit: any}) {
    const [show, setShow] = useState<boolean>(false)

    return (
        <>
        <Grid container alignItems={'center'} columnSpacing={1} sx={{wordWrap: 'break-word'}}>
            <Grid xs={2}>{work.start} ~ {work.end}</Grid>
            <Grid xs={4} >{work.item} </Grid>
            <Grid xs={4}>{work.type} </Grid>
            <Grid xs={2} spacing={2}>
                <Button sx={{m: 1}} variant="outlined" onClick={()=>{setShow(!show)}}>{show ? 'Hidden' : 'Show'}</Button>
                <Button sx={{m: 1}} variant="contained" onClick={()=>clickEdit(work)}>Edit</Button>
            </Grid>
            
        </Grid>
        {show && 
            <Grid container>
                <Grid xs={12}><pre>{work.comment}</pre></Grid>
            </Grid>
        }
        </>
    )
}

export default function WorkCard ({work, edit=false}: {work: Work,edit?: boolean} ) {
    const [data, setData] = useState<Work>(work)
    const [editMode, setEditMode] = useState<boolean>(edit)

    useEffect(()=>{
        setData({...work})
    },[])

    return (
        <>
            {editMode 
               ? <EditForm work={data} clickSave={(data:any)=>{setData(data);setEditMode(false)}}/> 
               : <Display work={data} clickEdit={()=>setEditMode(true)}/>
            }
        </>
    )
}