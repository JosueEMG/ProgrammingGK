require('dotenv').config()

const axios = require('axios').default
const { Client, MessageEmbed } = require('discord.js')
const client = new Client()

client.on('ready', () => {
    console.log('Our bot is ready to go')
})

client.on('message', async msg => {
    if (msg.content === '/mongodb-aggregate') {
        msg.reply(`db.usuarios.aggregate(
            [
                {
                    $match: { // Hace referencia a la "clave primaria" de la coleccion actual
                        _id: ObjectId("602697034b973e01bc4cf9d7")
                    }
                },
                {
                    $lookup: { // Hace el "inner join" a la coleccion cursos
                        from: 'cursos', // especifica la coleccion
                        localField: 'cursos', // hace referencia a la "clave foranea" de la coleccion actual
                        foreignField: '_id', // hace referenica a la "clave primaria" de la coleccion a unir
                        as: 'curso' // permite colocar el nombre del campo unido
                    }
                },
                {
                    $unwind: '$curso' // separa en documentos cuantas veces existan cursos dentro de alumnos
                },
                {
                    $lookup: {
                        from: 'docentes',
                        localField: 'curso.docente',
                        foreignField: '_id',
                        as: 'docente'
                    }
                },
                {
                    $unwind: '$docente'
                },
                {
                    $project: {
                        _id: '$_id',
                        nombre_alumno: '$nombre',
                        nombre_curso: '$curso.nombre',
                        nombre_docente: '$docente.nombre',
                        edad_docente: '$docente.edad'
                    }
                }
            ]
        ).pretty()
        `)
    }

    if (msg.content === '/mongodb-find') {
        msg.reply(`model.find()`)
    }

    if (msg.content === '/mongodb-insert') {
        msg.reply(`new Model({
            name: 'name',
            password: 'password'
        })`)
    }

    if (msg.content === '/mongodb-update') {
        msg.reply(`model.findByIdAndUpdate(id, {
            name: 'new name',
            password: 'new password'
        }, {
            new: true
        })`)
    }

    if (msg.content === '/mongodb-delete') {
        msg.reply(`model.findByIdAndDelete(id)`)
    }

    if (msg.content === '/comandos') {
        const embed1 = new MessageEmbed()
        .setColor('RED')
        .setTitle('Comandos para mongoose')
            .addField('/mongodb-find', 'permite encontrar todos los documentos creados de una colección')
            .addField('/mongodb-insert', 'permite insertar un documento a la colección')
            .addField('/mongodb-update', 'permite actualizar un docuemnto de la colección por su ID')
            .addField('/mongodb-delete', 'permite eliminar un documento de la colleción por su ID')
        const embed2 = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Consumir APIS')
            .addField('/api/rickandmortyapi', 'permite una vista previa del contenido de la api de rick and morty')
        msg.channel.send(embed1)
        msg.channel.send(embed2)

    }

    if (msg.content === '/api/rickandmortyapi') {

        try {
            const response = await axios('https://rickandmortyapi.com/api/character')
            response.data.results.map(data => {
                const embed = new MessageEmbed()
                embed.addField(data.name, data.url)
                embed.setImage(data.image)
                msg.channel.send(embed)
            })

        } catch (error) {
            msg.channel.send('Hubo un error al momento de consumir la API')
            console.log(error)
        }
        
    }

    if (msg.conten === '/clear') {
        
    }

    
})

client.login(process.env.BOT_TOKEN)