import PageLoader from '@/components/shared/PageLoader';

const Loading = () => {
   return (
      <>
         <div
            className="fixed inset-0 flex-center"
            style={{
               background: '#fefcff',
               backgroundImage:
                  'radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%), radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)',
            }}
         />
         <PageLoader center dark />
      </>
   );
};

export default Loading;
