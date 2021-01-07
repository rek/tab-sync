import * as React from 'react'

export function deleteTabSharedState(name: string) {
	// cleanup
}

// useTabSharedState
export function useTabSharedState<T>(name: string, initialValue: T): [T, (updatedValue: T) => void] {
	const [value, setInternalValue] = React.useState(initialValue);

	const setValue = React.useCallback((newValue: T) => {
		setInternalValue(newValue)

		// set set remote
		localStorage.setItem(name, JSON.stringify(newValue))
	}, [name])

	React.useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			// console.log(`Key Changed: ${event.key}`);
			// console.log(`New Value: ${event.newValue}`);

			// only if the right key changes, should we trigger our action
			if (event.key === name) {
				const valueFromLS = localStorage.getItem(name)
				if (valueFromLS) {
					const newValue = JSON.parse(valueFromLS)
					setValue(newValue)
				}
			}
		}

		// this event will only trigger when a window other than itself makes changes to local storage
		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange)
		}
	}, [name, setValue])

	return [value, setValue]
}
