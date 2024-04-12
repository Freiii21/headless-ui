import { Component, ErrorInfo, ReactNode, Suspense } from "react";

import { ErrorPage } from "pages";
import { BrokenAppIcon } from "ui/icons";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log(error, errorInfo);
	}

	render() {
		const { hasError } = this.state;
		const { children } = this.props;

		if (hasError) {
			return (
				<Suspense fallback="">
					<ErrorPage errorMessage={"Произошла непредвиденная ошибка"}>
						<BrokenAppIcon />
					</ErrorPage>
				</Suspense>
			);
		}

		return children;
	}
}

export default ErrorBoundary;
