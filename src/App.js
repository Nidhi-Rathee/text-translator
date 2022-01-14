import { Box, Select, Button, Textarea, Text, Image } from '@chakra-ui/react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'

function App() {
    const [options, setOptions] = useState([])
    const [to, setTo] = useState("en")
    const [from, setFrom] = useState("en")
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")

    useEffect(() => {
        getLanguages()
    }, [])

    const getLanguages = () => {
        axios.get('https://libretranslate.de/languages',
            { headers: { 'accept': 'application/json' } }).then(res => {
                console.log(res)
                setOptions(res.data)
            })
    }

    const translate = async () => {
        let data = {
            q: input,
            source: from,
            target: to,
        }


        axios.post('https://libretranslate.de/translate', data).then(async (res) => {
            console.log('post', res.data)
            setOutput(res.data.translatedText)
            const dataRef = collection(db, 'words')
            await addDoc(dataRef, { from: { wordFrom: input, wordTo: res.data } })
        })

    }

    return (
        <>
            <Box className="App" >
                <Box d='flex' flexDirection='column'>
                    <Box d='flex' alignItems='center' justifyContent='center'>
                        <Image w='10%' src='favicon.ico' alt='Dan Abramov' borderRadius='lg' />
                        <Text p={[2, 4, 6, 8]} fontSize='2xl' textAlign='center' color='teal' fontWeight='4xl' fontFamily='system-ui'> Text Translator</Text>
                    </Box>
                    <Box m={10} justifyContent='center' alignItems='center'>
                        <Box >
                            <Text fontSize='1xl' fontFamily='system-ui' color='teal'>From: {from}</Text>
                            <Select placeholder='Select language' onChange={e => setFrom(e.target.value)}>
                                {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
                            </Select>
                        </Box>
                        <Box >
                            <Text fontSize='1xl' fontFamily='system-ui' color='teal'>To: {to}</Text>
                            <Select placeholder='Select language' onChange={e => setTo(e.target.value)}>
                                {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
                            </Select>
                        </Box>
                        <Box mt={5} >
                            <Textarea placeholder='Here is a sample placeholder' id='inputText' onInput={e => setInput(e.target.value)} />
                        </Box>
                        <Box mt={5} d='flex' justifyContent='center'>
                            <Button backgroundColor='teal' color='white' onClick={e => translate()}>Translate</Button>
                        </Box>
                        <Box mt={5}>
                            <Textarea placeholder='Here is a sample placeholder' id='outputText' value={output} />
                        </Box>

                    </Box>
                </Box>

            </Box>
        </>
    );
}

export default App;
