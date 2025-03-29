import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CreateTransactionProps } from './create-transaction.model';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { gqlClient } from '@/libs/shared/api/client/interceptor';
import { useCreateTransactionMutation } from '@/libs/shared/api/requests/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CONCEPTS } from '@/libs/utils/constant';

interface TransactionForm {
  concept: string;
  amount: number | null;
}

export const CreateTransaction = ({
  isOpen,
  onClose,
  refetch,
}: CreateTransactionProps) => {
  const postTransaction = useCreateTransactionMutation(gqlClient);
  const [date, setDate] = React.useState<Date>();
  const [formData, setFormData] = React.useState<TransactionForm>({
    concept: '',
    amount: null,
  });

  const hanldeForm = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log('form data => ', formData);
  const createNewTransaction = async (
    ev: React.ChangeEvent<HTMLFormElement>
  ) => {
    ev.preventDefault();

    try {
      const formatDate = dayjs(date).toISOString();

      await postTransaction.mutateAsync({
        amount: Number(formData.amount) ?? 0,
        concept: formData.concept,
        date: formatDate.toString(),
      });
      refetch();
      onClose();
      setFormData({
        amount: null,
        concept: '',
      });
      toast('Movimiento creado con éxito');
    } catch (error) {
      toast('No se pudo crear el movimiento, inténtalo de nuevo o más tarde');
      console.error(error);
    }
  };

  const handleClose = () => {
    setFormData({
      amount: null,
      concept: '',
    });
    setDate(undefined);
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Nuevo movimiento de dinero
          </DialogTitle>
          <div className="pt-4">
            <form onSubmit={createNewTransaction}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label>Monto</label>
                  <Input
                    type="number"
                    name="amount"
                    onChange={hanldeForm}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Concepto</label>
                  <Select
                    onValueChange={(value: string) =>
                      setFormData({ ...formData, concept: value })
                    }
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Concepto" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONCEPTS.map((item) => (
                        <SelectItem key={item.id} value={item.value}>
                          {item.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <label>Fecha</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={
                          'w-[240px] justify-start text-left font-normal ' +
                            !date && 'text-muted-foreground'
                        }
                      >
                        <CalendarIcon />
                        {date ? (
                          dayjs(date).format('DD MMMM YYYY')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    className="bg-gray-600 cursor-pointer hover:bg-gray-500"
                    onClick={handleClose}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button className="cursor-pointer" type="submit">
                    Crear Nuevo
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
