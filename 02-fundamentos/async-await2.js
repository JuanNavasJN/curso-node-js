let empleados = [{
    id: 1,
    nombre: 'Juan'
}, {
    id: 2,
    nombre: 'Fiorella'
}, {
    id: 3,
    nombre: 'Daniela'
}];

let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}];

let getEmpleado = async(id) => {

    let empleadoDB = empleados.find(empleado => empleado.id === id);

    if (!empleadoDB) {
        throw new Error(`No existe un empleado con el ID ${ id }`);
    } else {
        return empleadoDB;
    }
}

let getSalario = async(empleado) => {

    let salarioDB = salarios.find(salario => empleado.id === salario.id);
    if (!salarioDB) {
        throw new Error(`No se encontro un salario para el empleado ${ empleado.nombre }`);
    } else {
        return {
            nombre: empleado.nombre,
            salario: salarioDB.salario
        };
    }
}

let getInformacion = async(id) => {

    let empleado = await getEmpleado(id);
    let resp = await getSalario(empleado);

    return `${ resp.nombre } tiene un salario de ${ resp.salario }$`;
}

getInformacion(4)
    .then(mensaje => console.log(mensaje))
    .catch(e => console.log(e));