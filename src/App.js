import { Box, Select, Button, Textarea, Text, Image } from '@chakra-ui/react'
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
    const [options, setOptions] = useState([])
    const [to, setTo] = useState("en")
    const [from, setFrom] = useState("en")
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")

    useEffect(() => {
        getLanguages()
    })

    const getLanguages = () => {
        axios.get('https://libretranslate.de/languages',
            { headers: { 'accept': 'application/json' } }).then(res => {
                console.log(res)
                setOptions(res.data)
            })
    }

    const translate = () => {

        let data = {
            q: input,
            source: from,
            target: to,
        }

        axios.post('https://libretranslate.de/translate', data).then(res => {
            console.log('post', res.data)
            setOutput(res.data.translatedText)
        })
    }

    return (
        <Box className="App" h='100vh' justifyContent='center' alignItems='center'>
            <Box >
                <Box d='flex' alignItems='center' justifyContent='center'>
                    <Image w='10%' src='favicon.ico' alt='Dan Abramov' borderRadius='lg' />
                    <Text p={[2, 4, 6, 8]} fontSize='2xl' textAlign='center' fontWeight='4xl' fontFamily='system-ui'> Text Translator</Text>
                </Box>
                <Box d='flex' flexDirection='column' alignItems='center'>
                    <Box width='50%'>
                        <Text p={2} fontSize='1xl' fontFamily='system-ui'>From: {from}</Text>
                        <Select placeholder='Select language' onChange={e => setFrom(e.target.value)}>
                            {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
                        </Select>
                    </Box>
                    <Box width='50%'>
                        <Text p={2} fontSize='1xl' fontFamily='system-ui'>To: {to}</Text>
                        <Select placeholder='Select language' onChange={e => setTo(e.target.value)}>
                            {options.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
                        </Select>
                    </Box>
                    <Box width='50%' mt={5}>
                        <Textarea placeholder='Here is a sample placeholder' onInput={e => setInput(e.target.value)} />
                    </Box>
                    <Box width='50%' mt={5}>
                        <Textarea placeholder='Here is a sample placeholder' value={output} />
                    </Box>
                    <Box mt={2}>
                        <Button backgroundColor='teal' color='white' onClick={e => translate()}>Translate</Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}

export default App;
