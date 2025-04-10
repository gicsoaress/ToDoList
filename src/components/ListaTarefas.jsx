import {useEffect, useState} from 'react';
import './ListaTarefas.css';

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');
    const [check, setCheck] = useState(false);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        const tarefasSalvas = localStorage.getItem('tarefas');
        try {
            const tarefasCarregadas = JSON.parse(tarefasSalvas);
            if (Array.isArray(tarefasCarregadas)) {
                setTarefas(tarefasCarregadas);
            } 
        } catch (erro) {
            console.error("Erro ao carregar as tarefas", erro);
        } finally {
            setCarregado(true);
        }
    }, []);

    useEffect(() => {
        if (carregado) {
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
        }
    }, [tarefas, carregado])

    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            setTarefas([...tarefas, novaTarefa]);
            setNovaTarefa("");
        }
    };

    const removerTarefa = (indice) => {
        setTarefas(tarefas.filter((_, i) => i !== indice));
    };

    return (
        <div >
        <h1>Gerenciador de Tarefas</h1>
        <div id='div'>
            <h2>Lista de tarefas</h2>
            <input
                type='text'
                value={novaTarefa}
                onChange={(e) => setNovaTarefa(e.target.value)}    
                placeholder='Digite uma nova tarefa'
            />
            <button id='addTarefa' onClick={adicionarTarefa}>Adicionar</button>
            <ul style={{listStyleType: 'none'}}>
                {tarefas.map((tarefa, indice) => (
                    <li key={indice}>
                        <input  
                            type = "checkbox"
                            checked = {check}
                            onChange = {e => {
                                setCheck(e.target.checked)
                            }}
                        />
                        {tarefa} 
                        <button id='removerTarefa' onClick={() => 
                            removerTarefa(indice)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}

export default ListaTarefas;