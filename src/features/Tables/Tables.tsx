import { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";

import { UserType } from "api/types";
import { fakeUserAPI } from "api/usersAPI";
import { JustTable } from "./JustTable";
import { TableWithWidthLimit } from "./TableWithWidthLimit";
import { TableWithHeightLimit } from "./TableWithHeightLimit";

export const Tables: FC = () => {
	const [users, setUsers] = useState<UserType[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		(async () => {
			try {
				const data = await fakeUserAPI.getUsers();
				setUsers(data);
			} catch {
				setErrorMessage("Failed to load users...");
			}
		})();
	}, []);

	if (!users.length || errorMessage) {
		return <>{errorMessage || "Loading..."}</>;
	}

	return (
		<Container>
			<Row>
				<JustTable title={"Just table"} users={users} />
				<TableWithWidthLimit title={"Limited width and fixed column"} users={users} />
				<TableWithHeightLimit title={"Limited height and fixed row"} users={users} />
			</Row>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10rem;
`;

const Row = styled.div`
	width: 100%;
	display: flex;
	gap: 10rem;
`;
