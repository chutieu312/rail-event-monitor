import json
import os
import random
import time

import pika

RABBITMQ_HOST = os.getenv("RABBITMQ_HOST", "rabbitmq")
RABBITMQ_PORT = int(os.getenv("RABBITMQ_PORT", "5672"))
RABBITMQ_USER = os.getenv("RABBITMQ_USER", "guest")
RABBITMQ_PASSWORD = os.getenv("RABBITMQ_PASSWORD", "guest")
EXCHANGE = os.getenv("APP_EXCHANGE", "train.events.exchange")
ROUTING_KEY = os.getenv("APP_ROUTING_KEY", "train.events.key")

TRAIN_CODES = ["TR-1001", "TR-1002", "TR-1003"]
STATUSES = ["ON_TIME", "DELAYED", "MAINTENANCE"]
EVENT_TYPES = ["POSITION_UPDATE", "STATUS_UPDATE", "INCIDENT"]


def connect():
    credentials = pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASSWORD)
    params = pika.ConnectionParameters(host=RABBITMQ_HOST, port=RABBITMQ_PORT, credentials=credentials)
    return pika.BlockingConnection(params)


def main():
    print("Starting rail event simulator")

    while True:
        try:
            connection = connect()
            channel = connection.channel()
            channel.exchange_declare(exchange=EXCHANGE, exchange_type="direct", durable=True)

            while True:
                event = {
                    "trainCode": random.choice(TRAIN_CODES),
                    "eventType": random.choice(EVENT_TYPES),
                    "status": random.choice(STATUSES),
                    "details": f"auto-generated event {int(time.time())}",
                }
                channel.basic_publish(
                    exchange=EXCHANGE,
                    routing_key=ROUTING_KEY,
                    body=json.dumps(event),
                    properties=pika.BasicProperties(content_type="application/json", delivery_mode=2),
                )
                print(f"Published event: {event}")
                time.sleep(3)
        except Exception as ex:
            print(f"Simulator error: {ex}; retrying in 5s")
            time.sleep(5)


if __name__ == "__main__":
    main()
