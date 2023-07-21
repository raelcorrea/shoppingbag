let observers = {}

const subscribe = (event, callback) => {
  if (!observers[event]) observers[event] = []
  observers[event].push(callback)
}
const unsubscribe = (event) => {
  observers = observers.filter((observer) => observer !== event)
}
const notify = (event, message) => {
  if (!observers[event]) return
  observers[event].forEach((observer) => observer(message))
}

export { subscribe, unsubscribe, notify }
