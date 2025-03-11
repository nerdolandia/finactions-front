import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

export interface ActionColumnProps {
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}


export default function ActionsColumnDynamic({ onEdit, onDelete }: ActionColumnProps): GridColDef | null {
  if (!onEdit && !onDelete) {
    return null
  }

  return {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {

      let actions: React.JSX.Element[] = []

      if (onEdit) {
        actions.push(<GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => onEdit(id as number)}
          color="inherit"
          key="edit"
        />,)
      }

      if (onDelete) {
        actions.push(<GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => onDelete(id as number)}
          color="inherit"
          key="delete"
        />)
      }

      return actions
    },

  }
}