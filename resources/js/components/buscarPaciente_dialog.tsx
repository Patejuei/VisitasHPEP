import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function BuscarPacienteDialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buscar Paciente</DialogTitle>
          <DialogDescription>
            Ingrese el nombre o número de identificación del paciente.
          </DialogDescription>
        </DialogHeader>
        {/* Aquí puedes agregar el formulario de búsqueda */}
      </DialogContent>
    </Dialog>
  )
}