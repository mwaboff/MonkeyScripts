@extends('layouts.app')

@section('content')
@include('partials.home_banner')
<div class="row justify-content-center">


    @foreach ($recommended_scripts as $list_name => $script_list)
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">{{ $list_name }}</div>

            <div class="card-body">
                @foreach ($script_list as $script)
                    <a href="/script/{{ $script->id }}">
                        <div class="script_entry" style="margin-bottom:15px;">
                        {{ $script->title }}
                        </div>
                    </a>
                @endforeach
            </div>
        </div>
    </div>
    @endforeach
</div>

<div class="card-body">
    @if (session('status'))
        <div class="alert alert-success" role="alert">
            {{ session('status') }}
        </div>
    @endif

    {{ 'You are logged in!' }}
</div>

<script type="text/javascript" src="js/app.js"></script>
@endsection
