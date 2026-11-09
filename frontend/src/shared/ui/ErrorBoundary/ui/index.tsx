'use client'

import { Component, FC, ReactNode } from 'react'

import s from './styles.module.scss'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export const ErrorFallback: FC<{ onRetry?: () => void }> = ({ onRetry }) => {
  return (
    <div className={s.fallback}>
      <h2 className={s.title}>Что-то пошло не так</h2>
      {onRetry && (
        <button type="button" className={s.retry} onClick={onRetry}>
          Попробовать снова
        </button>
      )}
    </div>
  )
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  reset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) return <ErrorFallback onRetry={this.reset} />

    return this.props.children
  }
}
