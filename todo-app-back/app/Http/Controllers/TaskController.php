<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Closure;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TaskController extends Controller
{
    use AuthorizesRequests;
    /**
     * Récupère toutes les tâches de l'utilisateur connecté
     */
    public function index()
    {
        try {
            $tasks = Task::get();
            return response()->json($tasks, 200, [], JSON_PRETTY_PRINT);
        } catch (\Exception $e) {
            return response()->json([], 200); // Toujours retourner un tableau valide
        }
        
    }

    /**
     * Crée une nouvelle tâche
     */
  // app/Http/Controllers/TaskController.php
  public function store(Request $request)
  {
      \Log::info('Requête reçue:', $request->all()); // Log 1
  
      try {
           $validated = $request->validate([
              'title' => 'required|string|max:255',
              'description' => 'nullable|string',
              'completed' => 'sometimes|boolean'
          ]);
  
          \Log::info('Données validées:', $validated); // Log 2
  
          $task = Task::create($validated);
  
          \Log::info('Tâche créée:', $task->toArray()); // Log 3

          return response()->json($task, 201);
          
      } catch (\Exception $e) {
          \Log::error('Erreur création tâche:', [
              'message' => $e->getMessage(),
              'trace' => $e->getTraceAsString()
          ]);
          return response()->json([
              'message' => 'Erreur serveur',
              'error' => $e->getMessage()
          ], 200);
      }
  }

    /**
     * Met à jour une tâche existante
     */
    public function update(Request $request, Task $task)
    {
        // $this->authorize('update', $task);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean'
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    /**
     * Supprime une tâche
     */
    public function destroy(Task $task)
{
    // Vérifie que l'utilisateur peut supprimer cette tâche
    // $this->authorize('delete', $task);

    $task->delete();

    return response()->noContent();
}

    /**
     * Bascule le statut de complétion d'une tâche
     */
    public function toggle(Task $task)
    {
        // $this->authorize('update', $task);

        $task->update([
            'completed' => !$task->completed
        ]);

        return response()->json($task);
    }
    public function handle($request, Closure $next)
	{
		return $next($request)
			->header('Access-Control-Allow-Origin', 'http://localhost:5173')
			->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
			->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
	}


}