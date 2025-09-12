import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
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

  return (
    <div className="h-screen w-[20%] bg-slate-900 flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-white text-center">CONFIGURAÇÕES</h2>
        <h2 className="text-white text-center">PARÂMETROS</h2>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit((data) => console.log(data))}
        >
          <FormField
            control={form.control}
            name="algoritmo"
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
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default SideBar;
