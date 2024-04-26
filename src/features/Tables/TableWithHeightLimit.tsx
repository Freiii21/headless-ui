import { FC, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";

import { UserType } from "api/types";
import { convertRemToPx } from "utils";
import { colors, fonts } from "ui/style";
import { ColumnResizingIcon } from "ui/icons";

type Props = {
	title: string;
	users: UserType[];
};

export const TableWithHeightLimit: FC<Props> = ({ title, users }) => {
	const [columnResizingMode, setColumnResizingMode] = useState<boolean>(false);

	const columnHelper = createColumnHelper<UserType>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const columns: ColumnDef<UserType, any>[] = [
		columnHelper.accessor("id", {
			enableResizing: false,
			header: () => <Cell>Id</Cell>,
			cell: (cell) => <Cell>{cell.getValue()}</Cell>,
		}),
		columnHelper.accessor("name", {
			header: () => <Cell>Name</Cell>,
			cell: (cell) => <Cell>{cell.getValue()}</Cell>,
		}),
		columnHelper.accessor("age", {
			header: () => <Cell>Age</Cell>,
			cell: (cell) => <Cell>{cell.getValue()}</Cell>,
		}),
		columnHelper.accessor("company", {
			size: convertRemToPx(14),
			header: () => <Cell>Company</Cell>,
			cell: (cell) => <Cell>{cell.getValue()}</Cell>,
		}),
		columnHelper.accessor("twitter", {
			size: convertRemToPx(14),
			header: () => <Cell>Twitterrrrrrrrrrrrrr rrrrrrrrrrrrrrrrrrrrrr rrrrrr</Cell>,
			cell: (cell) => <Cell>{cell.getValue()}</Cell>,
		}),
	];

	const tableInstance = useReactTable({
		data: users,
		columns,
		getCoreRowModel: getCoreRowModel(),
		defaultColumn: {
			size: convertRemToPx(10),
			minSize: convertRemToPx(2),
			maxSize: convertRemToPx(50),
		},
		enableColumnResizing: columnResizingMode,
		columnResizeMode: "onChange",
	});

	return (
		<Container>
			<Title>{title}</Title>

			<Actions>
				<StyledColumnResizingIcon
					isActive={columnResizingMode}
					onClick={() => setColumnResizingMode((prev) => !prev)}
				/>
			</Actions>

			<TableContainer>
				<StyledTable>
					<StyledTableHead>
						{tableInstance.getHeaderGroups().map((headerGroup) => {
							return (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<StyledTh
												key={header.id}
												colSpan={header.colSpan}
												size={header.getSize()}
												isPinned={header.index === 0}
											>
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
												{header.column.getCanResize() && (
													<ResizingLine
														onMouseDown={header.getResizeHandler()}
														onTouchStart={header.getResizeHandler()}
													/>
												)}
											</StyledTh>
										);
									})}
								</tr>
							);
						})}
					</StyledTableHead>

					<tbody>
						{tableInstance.getRowModel().rows.map((row) => {
							return (
								<StyledTr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<StyledTd key={cell.id} size={cell.column.getSize()}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</StyledTd>
										);
									})}
								</StyledTr>
							);
						})}
					</tbody>
				</StyledTable>
			</TableContainer>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	text-align: center;
	padding-bottom: 1rem;
	${css`
		${fonts.xxl}
	`};
`;

const TableContainer = styled.div`
	border: 0.2rem solid ${colors.middleGrey};
	border-radius: 0.4rem;
	height: 20rem;
	overflow: auto;
`;

const StyledTable = styled.table`
	border-collapse: collapse;
`;

const StyledTableHead = styled.thead`
	background-color: ${colors.lightGrey};
	box-shadow: inset 0 -0.2rem 0 ${colors.middleGrey};
	position: sticky;
	top: 0;
`;

const StyledTh = styled.th<{ size: number; isPinned: boolean }>`
	min-width: 5rem;
	max-width: ${({ size }) => `${size}px`};
	overflow: hidden;
	padding: 1rem 2rem 1.2rem 2rem;
	position: relative;
`;

const StyledTr = styled.tr`
	border-bottom: 0.2rem solid ${colors.middleGrey};
	&:last-of-type {
		border-bottom: none;
	}
`;

const StyledTd = styled.td<{ size: number }>`
	min-width: 5rem;
	max-width: ${({ size }) => `${size}px`};
	overflow: hidden;
	padding: 1rem 2rem;
`;

const ResizingLine = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 4px;
	background: ${colors.middleGrey};
	cursor: col-resize;
	user-select: none;
	touch-action: none;
`;

const Cell = styled.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const Actions = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 1rem;
`;

const StyledColumnResizingIcon = styled(ColumnResizingIcon)`
	cursor: pointer;
`;
