import { FC, memo, ReactNode, useCallback } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { fonts } from "ui/style";

type Props = {
	errorMessage: string;
	children: ReactNode;
};

export const ErrorPage: FC<Props> = memo(({ errorMessage, children }) => {
	const reloadPage = useCallback(() => {
		location.reload();
	}, []);

	return (
		<Container>
			{children}
			<Message>{errorMessage}</Message>
			<StyledButton onClick={reloadPage}>Обновить страницу</StyledButton>
		</Container>
	);
});

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	margin-top: 12.2rem;
`;

const StyledButton = styled.button`
	padding: 2rem;
	border-radius: 1rem;
	font-weight: bold;
	cursor: pointer;
`;

const Message = styled.div`
	margin: 2rem 0 3.6rem 0;
	${css`
		${fonts.xxl}
	`}
`;
