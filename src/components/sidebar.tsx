import { useForm, useWatch } from "react-hook-form";
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
import { Slider } from "@/components/ui/slider";
import { useEffect } from "react";
import type { Pixel } from "@/components/Canva/config/pixel";
import { useCalculatePoints } from "@/hooks/calculatePoints";
import { useCalculateTransformations } from "@/hooks/calculateTransformations";

interface sidebarProps {
  onFormChange: (points: Pixel[]) => void;
}

const SideBar: React.FC<sidebarProps> = ({ onFormChange }) => {
  const form = useForm();
  const formData = useWatch({ control: form.control });
  const algorithm = formData?.algorithm;

  let points = useCalculatePoints(formData);
  points = useCalculateTransformations(points, formData);

  useEffect(() => {
    onFormChange(points);
  }, [points, onFormChange]);

  return (
    <div className="h-screen w-[20%] bg-slate-900 flex flex-col gap-8 p-8 overflow-y-auto">
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
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {algorithm === "circle" && (
            <div className="flex flex-col gap-4">
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
            </div>
          )}
          {algorithm === "bresenham" && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="x_start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">X Inicial</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="y_start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Y Inicial</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="x_final"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">X Final</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="y_final"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Y Final</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          {algorithm === "curve" && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="x_start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">X Inicial</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="y_start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Y Inicial</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="x_control1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">X Controle 1</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="y_control1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Y Controle 1</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="x_control2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">X Controle 2</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="y_control2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Y Controle 2</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="x_final"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">X Final</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="y_final"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Y Final</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          {algorithm === "recursive_fill" && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="x_seed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">X Semente</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="y_seed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Y Semente</FormLabel>
                      <FormControl>
                        <Input className="text-black bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="cor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Cor</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black bg-white"
                        {...field}
                        placeholder="#FF0000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-white text-sm mt-2">
                * O preenchimento será feito em um polígono pré-desenhado.
              </div>
            </div>
          )}
          {algorithm && (
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="angle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Ângulo (graus)</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          className="text-black bg-white mb-2"
                          type="number"
                          value={field.value ?? 0}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                        <Slider
                          value={[field.value ?? 0]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          min={0}
                          max={360}
                          step={1}
                          className="[&_[data-state='active']]:bg-blue-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="x_pivot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">X Pivô</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black bg-white"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="y_pivot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Y Pivô</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black bg-white"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="dx"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      ΔX (Translação)
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          className="text-black bg-white mb-2"
                          type="number"
                          {...field}
                        />
                        <Slider
                          value={[field.value ?? 0]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          min={-100}
                          max={100}
                          step={1}
                          className="[&_[data-state='active']]:bg-blue-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      ΔY (Translação)
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          className="text-black bg-white mb-2"
                          type="number"
                          {...field}
                        />
                        <Slider
                          value={[field.value ?? 0]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          min={-100}
                          max={100}
                          step={1}
                          className="[&_[data-state='active']]:bg-blue-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sx"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">SX (Escala X)</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          className="text-black bg-white mb-2"
                          type="number"
                          {...field}
                        />
                        <Slider
                          value={[field.value ?? 1]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          min={0}
                          max={10}
                          step={0.1}
                          className="[&_[data-state='active']]:bg-blue-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">SY (Escala Y)</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          className="text-black bg-white mb-2"
                          type="number"
                          {...field}
                        />
                        <Slider
                          value={[field.value ?? 1]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          min={0}
                          max={10}
                          step={0.1}
                          className="[&_[data-state='active']]:bg-blue-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="x_fixed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">X Fixo</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black bg-white"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="y_fixed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Y Fixo</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black bg-white"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default SideBar;
