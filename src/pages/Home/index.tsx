import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { TableIcon } from "ui/icons";
import { RouteListEnum } from "enums";
import { colors, fonts } from "ui/style";

export const HomePage: FC = () => {
	return (
		<Container>
			<Link to={RouteListEnum.Tables}>
				<Block>
					Tables <TableIcon />
				</Block>
			</Link>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	${css`
		${fonts.xxl}
	`};
`;

const Block = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem 6rem;
	border: 0.3rem solid ${colors.darkGrey};
	border-radius: 2rem;
	background-color: ${colors.lightGrey};

	:hover {
		background-color: ${colors.middleGrey};
		transform: scale(1.05);
		transition: transform ease-in-out 0.3s;
	}
`;
