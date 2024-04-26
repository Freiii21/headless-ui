import styled from "@emotion/styled";
import { AppRouter } from "components/AppRouter";

export const App = () => {
	return (
		<Container>
			<AppRouter />
		</Container>
	);
};

const Container = styled.div`
	padding: 2rem 2rem 0 2rem;
`;
