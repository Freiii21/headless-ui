import { FC, useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";

import { UserType } from "api/types";
import { fakeUserAPI } from "api/usersAPI";

export const Tables: FC = () => {
	const [users, setUsers] = useState<UserType[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");

	const userDefinition: ColumnDef<UserType>[] = [
		{
			header: "Id",
			accessorKey: "id",
		},
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "Age",
			accessorKey: "age",
		},
		{
			header: "Company",
			accessorKey: "company",
		},
		{
			header: () => <button onClick={() => alert("twitter!")}>Twitter</button>,
			accessorKey: "twitter",
			cell: (cell) => {
				return <button>{cell.getValue() as string}</button>;
			},
		},
	];

	const tableInstance = useReactTable({
		data: users,
		columns: userDefinition,
		getCoreRowModel: getCoreRowModel(),
	});

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
		<table>
			<thead>
				{tableInstance.getHeaderGroups().map((headerGroup) => {
					return (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<th colSpan={header.colSpan} key={header.id}>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								);
							})}
						</tr>
					);
				})}
			</thead>
			<tbody>
				{tableInstance.getRowModel().rows.map((row) => {
					return (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => {
								return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
