// src/app/main/events/[eventId]/loading.jsx
export default function LoadingEventDetails() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="ml-4 text-xl">Cargando detalles del evento...</p>
    </div>
  );
}