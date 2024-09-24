import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

type CardType = 'collected' | 'pending' | 'invoices' | 'customers';

interface CardData {
  title: string;
  value: number | string;
  type: CardType;
}

export default async function CardWrapper() {
  const { numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices } = await fetchCardData();

  // Создаём массив объектов для карт с явным указанием типов
  const cardsData: CardData[] = [
    { title: 'Собрано', value: totalPaidInvoices, type: 'collected' },
    { title: 'В ожидании', value: totalPendingInvoices, type: 'pending' },
    { title: 'Всего счетов', value: numberOfInvoices, type: 'invoices' },
    { title: 'Всего клиентов', value: numberOfCustomers, type: 'customers' },
  ];

  return (
    <>
      {cardsData.map((card) => (
        <Card
          key={card.type} // Используйте уникальный идентификатор, если он доступен
          title={card.title}
          value={card.value}
          type={card.type}
        />
      ))}
    </>
  );
}

export function Card({ title, value, type }: { title: string; value: number | string; type: CardType; }) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
