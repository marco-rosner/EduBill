DECLARE

invoices record;
local_date timestamp;
result record;

BEGIN

    FOR invoices in ( SELECT * FROM public.invoice )
    loop

      SELECT LOCALTIMESTAMP INTO local_date;

      IF invoices.due_date < local_date AND invoices.status <> 'paid' AND invoices.total_amount > 0 THEN
          UPDATE invoice
          SET interest_amount = invoices.interest_rate * invoices.total_amount
          WHERE id = invoices.id AND status <> 'paid';

          SELECT invoices INTO result;
      END IF;

    END loop;
    
    RETURN result;
END;