import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import Assistant from "./models/Assistant";
import Person2 from "./models/Person2";
import axios from 'axios';

const API_URL = "http://192.168.22.112:3000/";
const AIbody = {
    model: "lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf",
    messages: [
        { role: "user", content: "this hello is by tarush" }
    ],
    temperature: 0.7,
    max_tokens: -1,
    stream: false
}

export default function Game() {
    const getGameBaseData = async () => {
        const requestData = {
            model: "lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF/Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf",
            messages: [{ role: "user", content: 'this is hello by tarush gupta' }],
            temperature: 0.7,
            max_tokens: -1,
            stream: false,
        };

        try {
            const response = await axios.get(API_URL);

            console.log('responce: ', response)
        } catch (error) {
            console.log('error', error.message);
        }
    }


    useEffect(() => {
        getGameBaseData();
    }, []);

    return <Canvas
        flat gl={{ antialias: false }}
        orthographic
        camera={{ zoom: 180, near: 2, far: 8 }}
    >
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 0]} intensity={4} />

        <Suspense fallback={null}>
            <Assistant />
            <Person2 />
        </Suspense>

    </Canvas>
}