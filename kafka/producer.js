const { Kafka } = require('kafkajs')
const config = require('../config/kafka.config')
const messages = require('../kafka/data/sample.input')

const client = new Kafka({
    brokers: config.kafka.BROKERS,
    clientId: config.kafka.CLIENTID
})

const topic = config.kafka.TOPIC

const producer = client.producer()

let i = 0

const sendMessage = async (producer, topic) => {
    await producer.connect()

    setInterval(function () {
        i = i >= messages.length - 1 ? 0 : i + 1
        console.log(`Data = ${messages[i]}`)
        payloads = {
            topic: topic,
            messages: [
                { key: 'data to create:', value: JSON.stringify(messages[i]) }
            ]
        }
        console.log('payloads=', payloads)
        producer.send(payloads)
    }, 5000)
}

sendMessage(producer, topic)