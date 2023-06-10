import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Menu } from '../../componentes/Menu';
import { ControleEditora } from '../../classes/controle/ControleEditora';
import { ControleLivros } from '../../classes/controle/ControleLivros';
import styles from '../styles/Home.module.css';

let controleEditora = new ControleEditora();
let controleLivros = new ControleLivros();

let opcoes = controleEditora.getEditoras().map((editora) => {
  return {
    value: editora.codEditora,
    text: editora.nome
  }
});

const LivroDados = () => {
    const [titulo, setTitulo] = useState("");
    const [resumo, setResumo] = useState("");
    const [autores, setAutores] = useState("");
    const [codEditora, setCodEditora] = useState(opcoes[0]?.value || 0);
    const router = useRouter();

    const tratarCombo = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(e.target.value));
    }

    const incluir = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let livro = {
            codigo: "",
            titulo: titulo,
            resumo: resumo,
            autores: autores.split('\n'),
            codEditora: codEditora
        };
        await controleLivros.incluir(livro);
        router.push("/LivroLista");
    }

    return (
        <div className={styles.container}>
            <Head>
            <title>Adicionar Livro</title>
            </Head>

            <Menu />
            <main className='container mt-2'>
                <form onSubmit={incluir}>
                    <div className='mb-3'>
                    <label className='form-label'>Título:</label>
                        <input type="text" className='form-control' value={titulo} onChange={e => setTitulo(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                    <label className='form-label'>Resumo: </label>
                    <textarea className='form-control' value={resumo} onChange={e => setResumo(e.target.value)} />                     
                    </div>
                    <div className='mb-3'>
                    <label className='form-label'>Autores (separados por linha):</label>
                        <textarea className='form-control' value={autores} onChange={e => setAutores(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                    <label className='form-label'>Editora:</label>
                        <select className='form-control' value={codEditora} onChange={tratarCombo}>
                            {opcoes.map((opcao, index) => (
                                <option key={index} value={opcao.value}>{opcao.text}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Salvar Dados</button>
                </form>
            </main>
        </div>
    )
}

export default LivroDados;
