import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SideBar: React.FC = () => {
  const form = useForm();
  const algorithm = form.watch("algorithm");

  console.log(algorithm);

  return (
    <div className="h-screen w-[20%] bg-slate-900 flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-white text-center">CONFIGURAÇÕES</h2>
        <h2 className="text-white text-center">PARÂMETROS</h2>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit((data) => console.log(data))}
        >
          <FormField
            control={form.control}
            name="algorithm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Selecione o Algoritmo
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="bresenham">Bresenham</SelectItem>
                        <SelectItem value="circle">Círculos</SelectItem>
                        <SelectItem value="curve">Curvas de Bezier</SelectItem>
                        <SelectItem value="polilinha">Polilinha</SelectItem>
                        <SelectItem value="recursive_fill">
                          Preenchimento recursivo
                        </SelectItem>
                        <SelectItem value="recursive_scan">
                          Preenchimento por varredura
                        </SelectItem>
                        <SelectItem value="line_clipping">
                          Recorte de linha
                        </SelectItem>
                        <SelectItem value="polygon_clipping">
                          Recorte de Polígono
                        </SelectItem>
                        <SelectItem value="polygon_clipping">
                          Recorte de Polígono
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {algorithm === "circle" && (
            <>
              <FormField
                control={form.control}
                name="raio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Raio</FormLabel>
                    <FormControl>
                      <Input className="text-black bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="centroX"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Centro X</FormLabel>
                    <FormControl>
                      <Input className="text-black bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="centroY"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Centro Y</FormLabel>
                    <FormControl>
                      <Input className="text-black bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default SideBar;
