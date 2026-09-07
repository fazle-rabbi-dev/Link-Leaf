const BackgroundEffect = () => {
   return (
      <>
         <div
            className="min-h-screen w-full fixed inset-0 top-0 -z-10 dark:hidden"
            style={{
               backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #10b981 100%)
      `,
               backgroundSize: "100% 100%",
            }}
         />

         <div
            className="min-h-screen w-full fixed inset-0 top-0 -z-10 hidden dark:block"
            style={{
               background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
            }}
         />
      </>
   )
}

export default BackgroundEffect