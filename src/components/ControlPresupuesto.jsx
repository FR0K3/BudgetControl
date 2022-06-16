import {useState, useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState();
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        const nuevoPorcentaje = (((presupuesto - totalDisponible)/ presupuesto) * 100).toFixed(2);
        setPorcentaje(nuevoPorcentaje);

        setDisponible(totalDisponible);
        setGastado(totalGastado);

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500);

    }, [gastos])

    const toMoney = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleReset = () =>{
        const resultado = confirm('Desea reiniciar su presupuesto y sus gastos?');

        if(resultado){
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje} % gastado`}
                />
            </div>

            <div className='contenido-presupuesto'>
                <button className='reset-app' type='button' onClick={handleReset}>Reiniciar app</button>
                <p>
                    <span>Presupuesto: </span> {toMoney(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo': ''}`}>
                    <span>Disponible: </span> {toMoney(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {toMoney(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto