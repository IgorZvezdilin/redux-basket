import { Skeleton, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

interface ITotalSum {
    totalSum: number;
}
export default function TotalSum({ totalSum }: ITotalSum) {
    return (
        <Stack
            color={'white'}
            position={'sticky'}
            top={'20px'}
            width={'100%'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            {totalSum ? (
                <>
                    <Typography fontSize={20}>Итого:</Typography>
                    <Typography fontSize={32}>{totalSum} руб.</Typography>
                </>
            ) : (
                <Skeleton variant={'rounded'} width={200} height={100} />
            )}
        </Stack>
    );
}
